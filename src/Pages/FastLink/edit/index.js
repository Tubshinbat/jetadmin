import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import MetaTags from "react-meta-tags";
import base from "../../../base";
import { useCookies } from "react-cookie";

// HTML TAGS COMPONENTS
import CardBoby from "../../../Components/General/CardBody";
import Section from "../../../Components/General/Section";
import PageTitle from "../../../Components/PageTitle";
import Spinner from "../../../Components/General/Spinner";
import DropImage from "../../../Components/pictureDrop";
import IconDrop, { Dropzone as iconDrop } from "../../../Components/iconDrop";
import { ToastContainer } from "react-toastify";

// LIB
import { toastControl } from "../../../lib/toasControl";
import { requiredCheck, minLength, maxLength } from "../../../lib/inputRegex";

// ACTIONS

import {
  allRemove,
  tinymceAddPhoto,
} from "../../../redux/actions/imageActions";

import * as actions from "../../../redux/actions/fastLinkActions";

// STYLE CSS
import css from "./__.module.css";

const Add = (props) => {
  // USESTATE
  const [cookies, setCookie, removeCookie] = useCookies(["language"]);
  const [checked, setChecked] = useState([]);
  const [formData, setForm] = useState({});
  const [icon, setIcon] = useState(null);
  const [picture, setPicture] = useState(null);
  const [errors, setErrors] = useState({
    name: false,
    direct: false,
    picture: false,
    about: false,
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
      setTimeout(() => props.history.replace("/fast-links"), 2000);
    }
  }, [props.success]);

  //   DROP IMAGE CONTROL
  useEffect(() => {
    setForm((bf) => ({ ...bf, picture: props.picture }));
    checkFrom("picture", props.picture);
  }, [props.picture]);

  useEffect(() => {
    if (props.fastLink) {
      if (props.fastLink[cookies.language] !== undefined) {
        setForm(() => ({
          ...props.fastLink,
          ...props.fastLink[cookies.language],
        }));
      } else {
        Object.keys(formData).forEach((key) => {
          formData[key] = "";
        });
        setForm(() => ({ ...props.fastLink }));
      }
      if (props.fastLink.picture) {
        setPicture(() => props.fastLink.picture);
        setErrors((bf) => ({ ...bf, picture: true }));
      }
    }
  }, [props.fastLink, cookies.language]);

  // -- INIT FUNCTION
  const init = () => {
    props.removePhotos();
    props.clear();
    props.getFastLink(props.match.params.id);
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
      if (index === "picture") {
        if (formData[index] !== null)
          for (let i = 0; i < formData[index].length; i++) {
            sendData.append([index], formData[index][i]);
          }
      } else sendData.append(index, formData[index]);
    });

    sendData.append("oldPicture", picture);
    sendData.append("oldIcon", icon);

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

  const addClick = () => {
    const sendData = convertFromdata();

    allCheck() === true
      ? props.updateLink(props.match.params.id, sendData)
      : toastControl(
          "error",
          "Заавал бөглөх талбар бөглөнө үү дахин оролдоно уу!"
        );
  };

  //RENDER CATEGORIE

  return (
    <Section>
      <MetaTags>
        <title> Чухал холбоос | WEBR Control Panel</title>
        <meta name="description" content="Чухал холбоос | WeBR control panel" />
        <meta property="og:title" content="Чухал холбоос | web control panel" />
      </MetaTags>

      <PageTitle name={`Чухал холбоос засварлах ( ${cookies.language} )`} />
      <div className="row">
        {props.loading === true && <Spinner />}

        <div className="col-md-8 row">
          <CardBoby>
            <div className={`${css.AddForm} row`}>
              <div className="col-md-12">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}> Гарчиг {useCookies}</p>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="Гарчиг оруулна уу"
                    value={formData.name || ""}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <span className={`litleError`}>{errors.name}</span>
                  )}
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}> Тайлбар</p>
                  <textarea
                    className="form-control"
                    type="text"
                    name="about"
                    placeholder="Тайлбар оруулна уу"
                    value={formData.about || ""}
                    onChange={handleChange}
                  ></textarea>
                  {errors.about && (
                    <span className={`litleError`}>{errors.about}</span>
                  )}
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}> Холбоос {useCookies}</p>
                  <input
                    className="form-control"
                    type="text"
                    name="direct"
                    placeholder="Холбоос оруулна уу"
                    value={formData.direct || ""}
                    onChange={handleChange}
                  />
                  {errors.direct && (
                    <span className={`litleError`}>{errors.direct}</span>
                  )}
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
                <i className="far fa-image"></i> Ар талын зураг
              </h3>
            </div>
            <div className="card-body box-profile">
              <div className={css.CategoryBox}>
                <div className="card-body box-profile">
                  <div className="form-group">
                    <DropImage />
                  </div>
                  <p> Одоо байгаа зураг </p>
                  {picture && (
                    <div className={css.PictureBox}>
                      <img
                        src={`${base.cdnUrl}uploads/450/${picture}`}
                        className={`${css.OldImage} `}
                      />
                    </div>
                  )}
                  {errors.picture && (
                    <span className={`litleError`}>{errors.picture}</span>
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
    picture: state.imageReducer.picture,
    icon: state.imageReducer.icon,
    error: state.fastLinkReducer.error,
    loading: state.fastLinkReducer.loading,
    success: state.fastLinkReducer.success,
    fastLink: state.fastLinkReducer.fastLink,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removePhotos: () => dispatch(allRemove()),
    getFastLink: (id) => dispatch(actions.getFastLink(id)),
    updateLink: (id, data) => dispatch(actions.updateFastLink(id, data)),
    clear: () => dispatch(actions.clear()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);
