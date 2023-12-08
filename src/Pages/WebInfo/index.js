// Imports
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import base from "../../base";
import { useCookies } from "react-cookie";

// HTML TAGS
import Section from "../../Components/General/Section";
import PageTitle from "../../Components/PageTitle";
import Button from "../../Components/General/Button";
import { ToastContainer } from "react-toastify";

// LIB
import { toastControl } from "../../lib/toasControl";
import {
  requiredCheck,
  onlyNumber,
  regEmail,
  fileCheck,
} from "../../lib/inputRegex";

//COMPONENTS
import SocialLinks from "../../Components/SocialLinks";
import ColorImage from "../../Components/DropLogo/colorLogo";
import WhiteLogo from "../../Components/DropLogo/whiteLogo";
import CardBoby from "../../Components/General/CardBody";
import Spinner from "../../Components/General/Spinner";

//style
import css from "./__.module.css";

//ACTIONS
import * as actions from "../../redux/actions/webinfoActions";

const WebInfo = (props) => {
  // WEBINFO PAGE INIT
  const [cookies, setCookie, removeCookie] = useCookies(["language"]);
  useEffect(() => {
    props.loadWebinfo();
  }, []);

  useEffect(() => {
    if (props.webInfo) {
      if (props.webInfo[cookies.language] !== undefined) {
        setInputData((bf) => ({
          ...props.webInfo,
          ...props.webInfo[cookies.language],
        }));
      } else {
        setInputData((bf) => ({}));
      }
    }
  }, [props.webInfo, cookies.language]);

  // USESTATE
  // Detials Forms

  const [inputData, setInputData] = useState({});

  const [logos, setLogos] = useState({
    logo: "no-logo.png",
    whiteLogo: "no-logo.png",
  });

  const [errors, setErrors] = useState({
    name: true,
    phone: true,
    email: true,
    address: true,
    siteInfo: true,
    policy: true,
    logo: true,
    whiteLogo: true,
  });

  // UseEffect webinfo татаж авах үед
  useEffect(() => {
    if (props.logo) {
      setLogos((bf) => ({ ...bf, logo: props.logo }));
    }
    checkInput("logo", props.logo);
  }, [props.logo]);

  useEffect(() => {
    if (props.whiteLogo) {
      setLogos((bf) => ({ ...bf, whiteLogo: props.whiteLogo }));
    }
    checkInput("whiteLogo", props.whiteLogo);
  }, [props.whiteLogo]);

  // Ямар нэгэн алдаа эсвэл амжилттай үйлдэл хийгдвэл энд useEffect барьж аваад TOAST харуулна
  useEffect(() => {
    toastControl("error", props.error);
  }, [props.error]);

  useEffect(() => {
    toastControl("success", props.success);
  }, [props.success]);

  const checkInput = (name, value) => {
    let result = requiredCheck(value);
    if (name === "phone" && result === true) result = onlyNumber(value);
    if (name === "email" && result === true) result = regEmail(value);
    if (name === "logo" && !inputData.logo) result = fileCheck(logos.logo);
    if (name === "whiteLogo" && !inputData.whiteLogo)
      result = fileCheck(logos.whiteLogo);
    setErrors((bfError) => ({ ...bfError, [name]: result }));
  };

  // CHECKS

  const checkTrue = () => {
    let errorsValues = Object.values(errors);
    let errorCount = 0;
    errorsValues.map((el) => {
      if (el === true) {
        errorCount++;
      }
    });
    return errorsValues.length === errorCount;
  };

  const allCheckErrors = () => {
    Object.keys(errors).map((el) => {
      checkInput(el, inputData[el] === undefined ? "" : inputData[el]);
    });

    return checkTrue();
  };

  const convertFromdata = () => {
    let formData = new FormData();
    Object.keys(inputData).map((key) => {
      formData.append(key, inputData[key]);
    });

    if (logos.logo.length > 0) {
      formData.append(`logo`, logos.logo[0]);
    }

    if (logos.whiteLogo.length > 0) {
      formData.append(`whiteLogo`, logos.whiteLogo[0]);
    }

    return formData;
  };

  //CLICK

  const handleSave = () => {
    const formData = convertFromdata();
    if (allCheckErrors()) {
      props.updateInfo(props.webInfo._id, formData);
    } else {
      toastControl("error", "Уучлаарай алдаа гарсан дахин оролдоно уу. ");
    }
  };

  const handleChange = (event) => {
    setInputData((bfData) => ({
      ...bfData,
      [event.target.name]: event.target.value,
    }));
    checkInput(event.target.name, event.target.value);
  };

  return (
    <Section>
      {props.loading ? <Spinner /> : null}
      <PageTitle name={`Вэб сайтын ёрөнхий тохиргоо (${cookies.language})`} />
      <div className="row">
        <div className={`col-md-12 ${css.WebinfoControl}`}>
          <Button
            text="Хадгалах"
            name="save"
            clickHandle={handleSave}
            addIcon={<i className="fas fa-share"></i>}
            btnClass={` btn-success btn-sm  `}
          />
          <button
            name="save"
            onClick={() => props.history.goBack()}
            className={` btn btn-sm ${css.Backbutton}`}
          >
            <i className="fas fa-arrow-left"></i> Буцах
          </button>
        </div>
        <div className="col-md-6">
          <CardBoby>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <p className={`${css.Title}`}>Өнгөт лого</p>
                  {errors.logo && (
                    <p className={css.LitleText}>{errors.logo}</p>
                  )}
                  <ColorImage />
                  <hr />
                  <p> Одоо байгаа өнгөт лого</p>
                  {inputData.logo && (
                    <img
                      src={`${base.cdnUrl}uploads/${inputData.logo}`}
                      className={css.OldLogo}
                    />
                  )}
                </div>
              </div>
            </div>
          </CardBoby>
          <CardBoby>
            <h4 className={`${css.subTitle}`}> Ерөнхий мэдээлэл </h4>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <p className={`${css.Title}`}>Сайтын нэр</p>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Сайтын нэрийг оруулна уу"
                    value={inputData.name}
                    onChange={handleChange}
                  />
                </div>
                {errors.name && <p className={css.LitleText}>{errors.name}</p>}
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <p className={`${css.Title}`}> Утас </p>
                  <input
                    type="number"
                    name="phone"
                    value={inputData.phone}
                    className="form-control"
                    placeholder="Утасны дугаар оруулна уу"
                    onChange={handleChange}
                  />
                </div>
                {errors.phone && (
                  <p className={css.LitleText}>{errors.phone}</p>
                )}
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <p className={`${css.Title}`}> Хаяг </p>
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    placeholder="Хаяг оруулна уу"
                    value={inputData.address}
                    onChange={handleChange}
                  />
                </div>
                {errors.address && (
                  <p className={css.LitleText}>{errors.address}</p>
                )}
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <p className={`${css.Title}`}> Имэйл хаяг </p>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Имэйл хаяг оруулна уу"
                    value={inputData.email}
                    onChange={handleChange}
                  />
                </div>
                {errors.email && (
                  <p className={css.LitleText}>{errors.email}</p>
                )}
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <p className={`${css.Title}`}> Сайтын тайлбар </p>
                  <textarea
                    className="form-control"
                    name="siteInfo"
                    placeholder="Сайтын тайлбарыг оруулна уу"
                    onChange={handleChange}
                    value={inputData.siteInfo}
                  ></textarea>
                </div>
                {errors.siteInfo && (
                  <p className={css.LitleText}>{errors.siteInfo}</p>
                )}
              </div>
            </div>
          </CardBoby>
        </div>
        <div className="col-md-6">
          <CardBoby>
            <div className="col-md-12">
              <div className="form-group">
                <p className={`${css.Title}`}>Цагаан өнгөтэй лого</p>
                {errors.whiteLogo && (
                  <p className={css.LitleText}>{errors.whiteLogo}</p>
                )}
                <WhiteLogo />
                <hr />
                <p> Одоо байгаа Цагаан өнгөтэй лого</p>
                {inputData.whiteLogo && (
                  <img
                    src={`${base.cdnUrl}uploads/${inputData.whiteLogo}`}
                    className={`${css.OldLogo} ${css.WhiteLogo}`}
                  />
                )}
              </div>
            </div>
          </CardBoby>
          <CardBoby>
            <div className="row">
              <div className="col-md-12">
                <SocialLinks />
              </div>
            </div>
          </CardBoby>
          <CardBoby>
            <div className="row">
              {/* <div className="col-md-12">
                <h4 className={`${css.subTitle}`}> ҮЙЛЧИЛГЭЭНИЙ НӨХЦӨЛ </h4>
                <div className="form-group">
                  <p className={`${css.Title}`}>
                    <i className="far fa-file-alt"></i>
                    Үйлчилгээний нөхцөл
                  </p>
                  <textarea
                    type="text"
                    name="policy"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Үйлчилгээний нөхцөлийг оруулна уу"
                    value={inputData.policy}
                  ></textarea>
                </div>
                {errors.policy && (
                  <p className={css.LitleText}>{errors.policy}</p>
                )}
              </div> */}
            </div>
          </CardBoby>
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
    logo: state.imageReducer.logo,
    whiteLogo: state.imageReducer.whiteLogo,
    error: state.webinfoReducer.error,
    success: state.webinfoReducer.success,
    loading: state.webinfoReducer.loading,
    webInfo: state.webinfoReducer.webInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadWebinfo: () => dispatch(actions.loadWebinfo()),
    updateInfo: (id, data) => dispatch(actions.updateWebinfo(id, data)),
    saveWebinfo: (data, newLogos) =>
      dispatch(actions.createWebinfo(data, newLogos)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WebInfo);
