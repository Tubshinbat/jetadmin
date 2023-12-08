import React, { useEffect } from "react";
import css from "./__.module.css";
import { connect } from "react-redux";
import * as action from "../../../../redux/actions/imageActions";

const Thumb = (props) => {
  return (
    <>
      {props.logo &&
        props.logo.map((el) => (
          <div className={css.Thumbs} key={el.name}>
            <div className={css.ThumbInner}>
              <img src={el.preview} className={css.Img} />
              <div className={css.Btn} onClick={() => props.removeLogo()}>
                x
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    logo: state.imageReducer.whiteLogo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeLogo: () => dispatch(action.removeWhiteLogo()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Thumb);
