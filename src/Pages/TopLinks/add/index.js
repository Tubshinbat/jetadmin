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
import TagInput from "@pymatech/react-tag-input";
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

import * as actions from "../../../redux/actions/topLinkActions";

// STYLE CSS
import css from "./__.module.css";

const Add = (props) => {
  // USESTATE
  const [cookies, setCookie, removeCookie] = useCookies(["language"]);
  const [checked, setChecked] = useState([]);
  const [formData, setForm] = useState({});
  const [errors, setErrors] = useState({
    name: false,
    picture: false,
    icon: false,
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
      setTimeout(() => props.history.replace("/top-links"), 2000);
    }
  }, [props.success]);

  //   DROP IMAGE CONTROL
  useEffect(() => {
    setForm((bf) => ({ ...bf, picture: props.picture }));
    checkFrom("picture", props.picture);
  }, [props.picture]);

  useEffect(() => {
    setForm((bf) => ({ ...bf, icon: props.icon }));
    checkFrom("icon", props.icon);
  }, [props.icon]);

  // -- INIT FUNCTION
  const init = () => {
    props.removePhotos();
    props.clear();
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

  const textAreaChange = (event) => {
    setForm((bf) => ({ ...bf, about: event }));
  };

  const convertFromdata = () => {
    const sendData = new FormData();
    Object.keys(formData).map((index) => {
      if (index === "picture" || index === "icon") {
        if (formData[index] !== null)
          for (let i = 0; i < formData[index].length; i++) {
            sendData.append([index], formData[index][i]);
          }
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

  const addClick = () => {
    const sendData = convertFromdata();

    allCheck() === true
      ? props.saveTopLink(sendData)
      : toastControl(
          "error",
          "Заавал бөглөх талбар бөглөнө үү дахин оролдоно уу!"
        );
  };

  //RENDER CATEGORIE

  return (
    <Section>
      <MetaTags>
        <title> Үндсэн 3 цэс нэмэх | WEBR Control Panel</title>
        <meta
          name="description"
          content="Үндсэн 3 цэс нэмэх | WeBR control panel"
        />
        <meta
          property="og:title"
          content="Үндсэн 3 цэс нэмэх | web control panel"
        />
      </MetaTags>

      <PageTitle name={`Үндсэн 3 цэс бичих ( ${cookies.language} )`} />
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
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <span className={`litleError`}>{errors.name}</span>
                  )}
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}> Холбоос холбох </p>
                  <input
                    className="form-control"
                    type="text"
                    name="direct"
                    placeholder="Холбоос оруулна уу"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}> Агуулга </p>
                  <Editor
                    apiKey="2nubq7tdhudthiy6wfb88xgs36os4z3f4tbtscdayg10vo1o"
                    name="about"
                    init={{
                      height: 300,
                      menubar: false,
                      plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount image media code     ",
                      ],
                      toolbar:
                        "undo redo | fontselect fontsizeselect formatselect | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help | link image | quickbars | media | code ",
                      file_picker_types: "image",
                      automatic_uploads: false,
                      file_picker_callback: function (cb, value, meta) {
                        var input = document.createElement("input");
                        input.setAttribute("type", "file");
                        input.setAttribute("accept", "image/*");
                        input.onchange = async function () {
                          var file = this.files[0];
                          const fData = new FormData();
                          fData.append("file", file);
                          await props.tinymceAddPhoto(fData);
                          const url =
                            `${base.cdnUrl}uploads/photo_img_` + file.name;
                          cb(url);
                        };
                        input.click();
                      },
                    }}
                    onEditorChange={textAreaChange}
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
                  {errors.picture && (
                    <span className={`litleError`}>{errors.picture}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="card card-primary card-outline">
            <div className="card-header">
              <h3 className="card-title">
                <i className="far fa-image"></i> Дүрс
              </h3>
            </div>
            <div className="card-body box-profile">
              <div className={css.CategoryBox}>
                <div className="card-body box-profile">
                  <div className="form-group">
                    <IconDrop />
                  </div>
                  {errors.icon && (
                    <span className={`litleError`}>{errors.icon}</span>
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
    error: state.topLinkReducer.error,
    loading: state.topLinkReducer.loading,
    success: state.topLinkReducer.success,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removePhotos: () => dispatch(allRemove()),
    saveTopLink: (news) => dispatch(actions.saveTopLink(news)),
    clear: () => dispatch(actions.clear()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);
