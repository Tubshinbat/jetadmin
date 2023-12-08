import React, { useEffect } from "react";
import css from "./__.module.css";
import { connect } from "react-redux";
import * as action from "../../../redux/actions/imageActions";

const Thumb = (props) => {
  return (
    <>
      {props.picture &&
        props.picture.map((el) => (
          <div className={css.Thumbs} key={el.name}>
            <div className={css.ThumbInner}>
              <img src={el.preview} className={css.Img} />
              <div className={css.Btn} onClick={() => props.removePicture()}>
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
    picture: state.imageReducer.picture,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removePicture: () => dispatch(action.removePicture()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Thumb);
