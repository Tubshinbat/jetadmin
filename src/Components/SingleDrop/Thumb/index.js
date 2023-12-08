import React, { useEffect } from "react";
import css from "./__.module.css";
import { connect } from "react-redux";
import * as action from "../../../redux/actions/imageActions";

const Thumb = (props) => {
  return (
    <>
      {props.banner &&
        props.banner.map((el) => (
          <div className={css.Thumbs} key={el.name}>
            <div className={css.ThumbInner}>
              <img src={el.preview} className={css.Img} />
              <div className={css.Btn} onClick={() => props.removeBanner()}>
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
    banner: state.imageReducer.banner,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeBanner: () => dispatch(action.removeBanner()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Thumb);
