import React, { useEffect } from "react";
import { connect } from "react-redux";
import { NavLink, Redirect, withRouter } from "react-router-dom";
import { useCookies } from "react-cookie";
import base from "../../../../base";
//ACTIONS
import * as actions from "../../../../redux/actions/loginActions";

// style
import css from "./__.module.css";

const UserInfo = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies();

  useEffect(() => {
    console.log(props.userId);
  }, []);

  const logout = () => {
    removeCookie("congresstoken");
    props.logout();
  };

  return (
    <>
      <div className={`user-panel mt-3 pb-3 mb-3 d-flex ${css.UserPanel}`}>
        <div className={`image ${css.AvatarLogo}`}>
          {props.avatar ? (
            <img
              src={`${base.cdnUrl}uploads/avatar/150x150/${props.avatar}`}
              className="img-circle elevation-2"
              alt="User Image"
            />
          ) : (
            <img
              src={`/assets/img/no-avatar.jpg`}
              className="img-circle elevation-2"
              alt="User Image"
            />
          )}
        </div>
        <div className={`info ${css.Info}`}>
          <a href="/userprofile" className={`d-block ${css.userProfile}`}>
            {props.name}
          </a>
          <div className={css.UserControl}>
            <a href="/settings" className={css.Tools}>
              <i className="fas fa-tools"></i>
            </a>
            <a href="/logout" className={css.SignOut}>
              <i className="fas fa-sign-out-alt"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.loginReducer.token,
    userId: state.tokenReducer.userId,
    name: state.tokenReducer.name,
    avatar: state.tokenReducer.avatar,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserInfo)
);
