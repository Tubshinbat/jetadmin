import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";

import base from "../../../base";

// HTML TAGS COMPONENTS
import CardBoby from "../../../Components/General/CardBody";
import Section from "../../../Components/General/Section";
import PageTitle from "../../../Components/PageTitle";
import Spinner from "../../../Components/General/Spinner";
import DropImage from "../../../Components/SingleDrop";
import DropVideo from "../../../Components/VideoDrop";

// LIB
import { toastControl } from "../../../lib/toasControl";
import { requiredCheck, minLength, maxLength } from "../../../lib/inputRegex";

// ACTIONS
import {
  allRemove,
  tinymceAddPhoto,
} from "../../../redux/actions/imageActions";
import * as actions from "../../../redux/actions/bannerActions";
import { loadMenus } from "../../../redux/actions/menuActions";

// STYLE CSS
import css from "./__.module.css";

const Add = (props) => {
  // USESTATE
  // const [showLink, setShowLink] = useState({
  //   link: false,
  //   menu: false,
  //   model: false,
  // });
  const [checked, setChecked] = useState([]);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({
    name: false,
    banner: false,
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
      init();
      setTimeout(() => props.history.replace("/banners"), 2000);
    }
  }, [props.success]);

  // DROP IMAGE CONTROL
  useEffect(() => {
    setForm((bf) => ({ ...bf, banner: props.banner }));
    checkFrom("banner", props.banner);
  }, [props.banner]);

  //CHECK FORM FUNCTION
  const init = () => {
    props.loadMenus();
    props.clear();
    props.removePhotos();
    setForm(() => ({}));
  };

  const categoryCheck = (c) => {
    checkFrom("menu", c);
    setForm((bf) => ({ ...bf, menu: c }));
  };

  const modelChange = (data) => {
    if (data) setForm((bf) => ({ ...bf, model: data }));
  };

  const linkChange = (e) => {
    setForm((bf) => ({ ...bf, link: e.target.value }));
  };

  const checkFrom = (name, val) => {
    // Шалгах формуудаа энд тодорхойлоно
    const valueErrors = Object.keys(errors);
    if (valueErrors.find((el) => checkName(el, name))) {
      let result = requiredCheck(val);
      if (name === "name" && result === true) {
        result = minLength(val, 5);
        result === true && (result = maxLength(val, 500));
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
      checkFrom(el, form[el] === undefined ? "" : form[el]);
    });
    return checkTrue();
  };

  const convertFromdata = () => {
    const sendData = new FormData();
    Object.keys(form).map((index) => {
      if (index === "banner" || index === "video") {
        if (form[index])
          for (let i = 0; i < form[index].length; i++) {
            sendData.append([index], form[index][i]);
          }
      } else sendData.append(index, form[index]);
    });

    return sendData;
  };

  // HANDLE CHANGE

  // const handleMenu = (event) => {
  //   setShowLink((bf) => ({ [event.target.value]: true }));
  //   setForm((bf) => ({ ...bf, model: "", menu: "", link: "" }));
  // };
  const handleChange = (event) => {
    let { name, value } = event.target;
    setForm((bf) => ({ ...bf, [name]: value }));
    checkFrom(event.target.name, event.target.value);
  };

  const checkName = (el, name) => {
    return name === el;
  };

  const handleRadio = (event) => {
    setForm((bf) => ({ ...bf, [event.target.name]: event.target.checked }));
  };

  const is_check_menu = (id) => {
    let result = false;
    if (form.menu) if (form.menu === id) return (result = true);
    return result;
  };

  // const is_check_model = (value) => {
  //   let result = false;
  //   if (form.model) if (form.model === value) return (result = true);
  //   return result;
  // };

  // //RENDER CATEGORIES
  // const renderCategories = (categories) => {
  //   let myCategories = [];
  //   categories.map((el) => {
  //     myCategories.push(
  //       <li key={el._id}>
  //         <div>
  //           <input
  //             className={`categoryId`}
  //             value={el._id}
  //             type="radio"
  //             name="menu"
  //             checked={is_check_menu(el._id)}
  //             onChange={() => categoryCheck(el._id)}
  //           />
  //           {el.name}
  //         </div>
  //         {el.children.length > 0 ? (
  //           <ul> {renderCategories(el.children)} </ul>
  //         ) : null}
  //       </li>
  //     );
  //   });
  //   return myCategories;
  // };

  // CLICK
  const backGo = () => {
    props.history.goBack();
  };

  const addClick = () => {
    if (allCheck() === true) {
      const sendData = convertFromdata();
      props.saveBanner(sendData);
    } else {
      toastControl(
        "error",
        "Заавал бөглөх талбар бөглөнө үү дахин оролдоно уу!"
      );
    }
  };

  return (
    <Section>
      <PageTitle name="Баннер" />
      <div className="row">
        {props.loading === true && <Spinner />}
        <div className="col-md-8">
          <div className={`${css.AddForm} row`}>
            <div className="col-md-12">
              <div className="card card-primary card-outline">
                <div className="card-header">
                  <h3 className="card-title">
                    <i className="far fa-image"></i> Баннер зураг
                  </h3>
                </div>
                <div className="card-body box-profile">
                  <div className={css.CategoryBox}>
                    <div className="card-body box-profile">
                      <div className="form-group">
                        <DropImage />
                      </div>
                      {errors.banner && (
                        <span className={`litleError`}>{errors.banner}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <CardBoby>
              <div className="col-md-12">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}> Гарчиг </p>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="Хуудасны гарчиг оруулна уу"
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <span className={`litleError`}>{errors.name}</span>
                  )}
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group input-group-sm">
                  <p className={`${css.Title}`}> Агуулга </p>
                  <textarea
                    className="form-control"
                    name="details"
                    onChange={handleChange}
                  ></textarea>
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
            </CardBoby>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card card-primary card-outline">
            <div className="card-header">
              <h3 className="card-title">ТОХИРГОО</h3>
            </div>
            <div className="card-body box-profile">
              <div className="form-group">
                <div className="custom-control custom-switch  ">
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
                <i className="fas fa-list"></i>Холбогдох холбоосын тохиргоо
              </h3>
            </div>
            <div className="card-body box-profile">
              {/* <select
                className={`form-control form-select ${css.ChangeMenu}`}
                onChange={handleMenu}
              >
                <option value=""> Баннер холбоосын төрөл </option>
                <option value="model"> Моделоос сонгох </option>
                <option value="menu"> Цэснээс холбох </option>
                <option value="link"> Линк холбох</option>
              </select> */}
              {/* <div
                className={`form-group ${
                  showLink.model ? css.Active : css.unActive
                }`}
              >
                <p className={`${css.Title}`}> Моделууд </p>
                <div className={`categoryBox`}>
                  <ul>
                    <li>
                      <input
                        className={`categoryId`}
                        type="radio"
                        value="news"
                        name="model"
                        checked={is_check_model("news")}
                        onChange={() => modelChange("news")}
                      />
                      Мэдээ мэдээлэл
                    </li>
                  </ul>
                </div>
              </div> */}

              <div className={`form-group `}>
                <p className={`${css.Title}`}> Холбох линк </p>
                <input
                  className="form-control"
                  type="text"
                  name="link"
                  placeholder="Холбох холбоос линкийг оруулна уу"
                  value={form.link}
                  onChange={linkChange}
                />
              </div>

              {/* <div
                className={`categoryBox ${
                  showLink.menu ? css.Active : css.unActive
                }`}
              >
                <p className={`${css.Title}`}> Цэс </p>
                <ul style={{ marginTop: "10px" }}>
                  {renderCategories(props.menus)}
                </ul>
              </div>
              {errors.menu && (
                <span className={`litleError`}>{errors.menu}</span>
              )} */}
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
    error: state.bannerReducer.error,
    loading: state.bannerReducer.loading,
    success: state.bannerReducer.success,
    menus: state.menuReducer.menus,
    banner: state.imageReducer.banner,
    video: state.imageReducer.video,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadMenus: () => dispatch(loadMenus()),
    removePhotos: () => dispatch(allRemove()),
    clear: () => dispatch(actions.clear()),
    saveBanner: (data) => dispatch(actions.createBanner(data)),
    tinymceAddPhoto: (file) => dispatch(tinymceAddPhoto(file)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);
