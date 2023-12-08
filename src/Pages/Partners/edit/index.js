import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import MetaTags from "react-meta-tags";
import base from "../../../base";

// HTML TAGS COMPONENTS
import CardBoby from "../../../Components/General/CardBody";
import Section from "../../../Components/General/Section";
import PageTitle from "../../../Components/PageTitle";
import Spinner from "../../../Components/General/Spinner";
import DropImage from "../../../Components/SingleDrop";
import { ToastContainer } from "react-toastify";

// LIB
import { toastControl } from "../../../lib/toasControl";
import { requiredCheck, minLength, maxLength } from "../../../lib/inputRegex";

// ACTIONS
import {
  allRemove,
  tinymceAddPhoto,
} from "../../../redux/actions/imageActions";
import * as actions from "../../../redux/actions/parentActions";

// STYLE CSS
import css from "./__.module.css";

const Add = (props) => {
  // USESTATE
  const [formData, setForm] = useState({});
  const [errors, setErrors] = useState({
    name: true,
    logo: true,
  });

  // USEEFFECT
  useEffect(() => {
    init();
  }, []);

  // Ямар нэгэн алдаа эсвэл амжилттай үйлдэл хийгдвэл энд useEffect барьж аваад TOAST харуулна
  useEffect(() => {
    toastControl("error", props.error);
  }, [props.error]);

  useEffect(() => {
    if (props.success) {
      toastControl("success", props.success);
      props.clear();
      setForm(() => ({}));
      setTimeout(() => props.history.replace("/partners"), 2000);
    }
  }, [props.success]);

  // DROP IMAGE CONTROL
  useEffect(() => {
    if (props.logo) setForm((bf) => ({ ...bf, logo: props.logo }));
    checkFrom("logo", props.logo);
  }, [props.logo]);

  useEffect(() => {
    setForm((bf) => ({ ...bf, ...props.parent }));
    if (props.parent.logo) {
      setForm((bf) => ({ ...bf, oldLogo: props.parent.logo }));
      setErrors((bf) => ({ ...bf, logo: true }));
    }
  }, [props.parent]);

  // -- INIT FUNCTION
  const init = () => {
    props.clear();
    props.removePhotos();
    props.getParent(props.match.params.id);
  };

  //CHECK FORM FUNCTION
  const checkName = (el, name) => {
    return name === el;
  };

  const checkFrom = (name, val) => {
    // Шалгах формуудаа энд тодорхойлоно
    const valueErrors = Object.keys(errors);
    if (valueErrors.find((el) => checkName(el, name))) {
      let result = requiredCheck(val);
      if (name === "name" && result === true) {
        result = minLength(val, 5);
        result === true && (result = maxLength(val, 300));
      }
      setErrors((bfError) => ({ ...bfError, [name]: result }));
    }
  };

  const checkTrue = () => {
    let errorCount = 0;
    let errorsValues = Object.values(errors);
    errorsValues.map((el) => {
      el === true && errorCount++;
    });
    return errorsValues.length === errorCount;
  };

  const allCheck = () => {
    Object.keys(errors).map((el) => {
      checkFrom(el, formData[el] === undefined ? "" : formData[el]);
    });
    return checkTrue();
  };

  const convertFromdata = () => {
    const sendData = new FormData();
    Object.keys(formData).map((index) => {
      if (index === "logo") {
        sendData.append([index], formData[index][0]);
      } else sendData.append(index, formData[index]);
    });
    return sendData;
  };

  // -- HANDLE CHANGE INPUT
  const handleChange = (event) => {
    let { name, value } = event.target;
    setForm((bf) => ({ ...bf, [name]: value }));
    checkFrom(event.target.name, event.target.value);
  };

  const handleRadio = (event) => {
    setForm((bf) => ({ ...bf, [event.target.name]: event.target.checked }));
  };
  // -- END HANDLE CHANGE INPUT

  /* -- CLICK EVENTS */
  const backGo = () => {
    props.history.goBack();
  };

  const deleteImage = () => {
    setForm((bf) => ({ ...bf, oldLogo: null }));
  };

  const addClick = () => {
    const sendData = convertFromdata();
    // console.log(formData);
    allCheck() === true
      ? props.updateParent(props.match.params.id, sendData)
      : toastControl(
          "error",
          "Заавал бөглөх талбар бөглөнө үү дахин оролдоно уу!"
        );
  };

  //RENDER CATEGORIES

  return (
    <Section>
      <MetaTags>
        <title> Компани шинэчлэх | WEBR Control Panel</title>
        <meta
          name="description"
          content="Компани шинэчлэх | WeBR control panel"
        />
        <meta
          property="og:title"
          content="Компани шинэчлэх | web control panel"
        />
      </MetaTags>

      <PageTitle name="Компани шинэчлэх" />
      <div className="row">
        {props.loading === true && <Spinner />}
        <div className="col-md-8">
          <CardBoby>
            <div className={`${css.AddForm} row`}>
              <div className="col-md-12">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}> Гарчиг </p>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="Компаний нэр оруулна уу"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <span className={`litleError`}>{errors.name}</span>
                  )}
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}> Холбоос </p>
                  <input
                    className="form-control"
                    type="text"
                    name="link"
                    placeholder="Холбоос оруулна уу"
                    value={formData.link}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-md-12">
                <div className={`btns`}>
                  <button
                    name="save"
                    onClick={addClick}
                    className={` btn-success btn-sm my-btn add-btn`}
                  >
                    <i className="fas fa-share"></i> Хадгалах
                  </button>

                  <button
                    name="dont"
                    className=" btn-default btn-sm my-btn"
                    onClick={backGo}
                  >
                    Болих
                  </button>
                </div>
              </div>
            </div>
          </CardBoby>
        </div>
        <div className="col-md-4">
          <div className="card card-primary card-outline">
            <div className="card-header">
              <h3 className="card-title">ТОХИРГОО</h3>
            </div>
            <div className="card-body box-profile">
              <div className="form-group">
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="newsActive"
                    name="status"
                    checked={formData.status}
                    onChange={handleRadio}
                  />
                  <label className="custom-control-label" htmlFor="newsActive">
                    Нийтэд харагдах
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="card card-primary card-outline">
            <div className="card-header">
              <h3 className="card-title">
                <i className="far fa-image"></i> Компаний лого
              </h3>
            </div>
            <div className="card-body box-profile">
              <div className={css.CategoryBox}>
                <div className="card-body box-profile">
                  <div className="form-group">
                    <DropImage />
                  </div>
                  <p className={css.oldText}> Одоо байгаа зураг: </p>
                  {formData.oldLogo && (
                    <>
                      <img
                        src={`${base.cdnUrl}uploads/${formData.oldLogo}`}
                        className={css.oldImage}
                      />
                      <button
                        className={`btn ${css.deletePhoto}`}
                        onClick={deleteImage}
                      >
                        Одоо байгаа зургийг устгах
                      </button>
                    </>
                  )}
                  {errors.logo && (
                    <span className={`litleError`}>{errors.logo}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Section>
  );
};

const mapStateToProps = (state) => {
  return {
    logo: state.imageReducer.banner,
    error: state.partnerReducer.error,
    parent: state.partnerReducer.parent,
    loading: state.partnerReducer.loading,
    success: state.partnerReducer.success,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removePhotos: () => dispatch(allRemove()),
    getParent: (id) => dispatch(actions.getParent(id)),
    updateParent: (id, data) => dispatch(actions.updateParent(id, data)),
    clear: () => dispatch(actions.clear()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);
