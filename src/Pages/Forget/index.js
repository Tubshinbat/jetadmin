import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Spinner from "../../Components/General/Spinner";
import { toastControl } from "../../lib/toasControl";
import { useCookies } from "react-cookie";
import {
  requiredCheck,
  minLength,
  maxLength,
  onlyNumber,
  regEmail,
} from "../../lib/inputRegex";
// Style
import css from "./__.module.css";
// ACtions
import * as actions from "../../redux/actions/loginActions";

const Forget = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["uatoken"]);
  const [code, setCode] = useState(null);
  const [inputCode, setInputCode] = useState(null);
  const [password, setPassword] = useState(false);
  // init
  useEffect(() => {
    if (cookies.uatoken) {
      document.location.href = "/";
    }
  }, []);

  useEffect(() => {
    if (props.token) {
      setCookie("uatoken", props.token);
    }
  }, props.token);

  useEffect(() => {
    if (cookies.uatoken && props.userId) {
      toastControl("success", "Амжилттай нэвтэрлээ");
      document.location.href = "/";
    }
  }, [props.userId]);

  // useState's

  const [form, setForm] = useState({});

  //handle inputs
  const handleChange = (event) => {
    let val = event.target.value;

    setForm((bf) => ({
      ...bf,
      [event.target.name]: val,
    }));
  };

  // Login
  const handleLogin = () => {
    if (requiredCheck(form.email) === true && regEmail(form.email) === true) {
      props.forgetPassword(form);
    } else {
      toastControl("error", "Утасны дугаараа оруулна уу");
    }
  };

  const handleCode = (event) => {
    setInputCode(event.target.value);
  };

  const handleContinue = () => {
    if (parseInt(props.code) === parseInt(inputCode)) {
      setPassword(true);
    } else {
      toastControl("error", "Баталгаажуулах код буруу байна");
      setPassword(false);
    }
  };

  const chnge = () => {
    if (
      requiredCheck(form.password) !== true &&
      requiredCheck(form.conPassword) !== true
    ) {
      toastControl("error", "Нууц үгээ оруулна уу");
    } else if (minLength(form.password, 8) !== true) {
      toastControl("error", minLength(form.password, 8));
    } else if (form.password !== form.conPassword) {
      toastControl("error", "Нууц үг таарахгүй байна");
    } else if (
      form.password === form.conPassword &&
      parseInt(code) === parseInt(props.code)
    ) {
      const data = {
        resetToken: code,
        password: form.password,
      };
      props.changePassword(data);
    } else {
      toastControl("error", "Заавал бөглөх талбар бөглөнө үү");
    }
  };

  // Ямар нэгэн алдаа эсвэл амжилттай үйлдэл хийгдвэл энд useEffect барьж аваад TOAST харуулна

  useEffect(() => {
    if (props.error) {
      toastControl("error", props.error);
    }
  }, [props.error]);

  useEffect(() => {
    if (props.success) {
      toastControl("success", props.success);
    }
    if (props.success === "Амжилттай нууц үг Шинэчлэгдлээ") {
      document.location.href = "/login";
    }
  }, [props.success]);

  useEffect(() => {
    if (props.code) {
      setCode(props.code);
    }
  }, [props.code]);

  return (
    <body className="hold-transition login-page">
      {/* {document.cookie && <Redirect to="/" />} */}
      {props.loading && <Spinner />}
      <div className="login-box">
        <div className={`login-logo ${css.LoginLogo}`}>
          <b>Нууц үг сэргээх</b>
        </div>
        {/* /.login-logo */}
        <div className="card">
          <div className="card-body login-card-body">
            <div className={`input-group mb-3 ${css.LoginInput}`}>
              <input
                type="email"
                className="form-control"
                placeholder="И-Мэйл хаягаа оруулна уу"
                name="email"
                onChange={handleChange}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-envelope" />
                </div>
              </div>
            </div>

            {code && (
              <>
                <div className="input-group mb-3 ">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Баталгаажлууах код"
                    name="code"
                    onChange={handleCode}
                  />
                </div>

                <div
                  className="input-group mb-3 "
                  style={{ display: code !== null ? "flex" : "none" }}
                >
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Шинэ нууц үг"
                    name="password"
                    onChange={handleChange}
                  />
                </div>
                <div
                  className="input-group mb-3 "
                  style={{ display: code !== null ? "flex" : "none" }}
                >
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Нууц үгээ давтан оруулна уу"
                    name="conPassword"
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            <div className="row">
              {code === null && (
                <div className="col-12">
                  <button
                    type="button"
                    onClick={handleLogin}
                    className={`btn btn-primary btn-block ${css.LoginBtn}`}
                  >
                    Баталгаажуулах код авах
                  </button>
                </div>
              )}
              {code && (
                <div className="col-12">
                  <button
                    type="button"
                    onClick={chnge}
                    className={`btn btn-primary btn-block ${css.LoginBtn}`}
                  >
                    Нууц үгээ солих
                  </button>
                </div>
              )}
            </div>

            <p className={`mb-1 ${css.ForgetText}`}>
              <Link to="/login">Надад бүртгэл байгаа?</Link>
            </p>
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
    </body>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.loginReducer.error,
    userId: state.loginReducer.userId,
    token: state.loginReducer.token,
    success: state.loginReducer.success,
    code: state.loginReducer.code,
    user: state.loginReducer.user,
    loading: state.loginReducer.loading,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    sendSMS: (phoneNumber) => dispatch(actions.sendSms(phoneNumber)),
    changePassword: (data) => dispatch(actions.changePassword(data)),
    forgetPassword: (data) => dispatch(actions.forgetPassword(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(Forget);
