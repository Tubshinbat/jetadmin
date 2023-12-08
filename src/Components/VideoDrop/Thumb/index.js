import React, { useEffect } from "react";
import css from "./__.module.css";
import { connect } from "react-redux";
import * as action from "../../../redux/actions/imageActions";

const Thumb = (props) => {
  return (
    <>
      {props.video &&
        props.video.map((el) => (
          <div className={css.Thumbs} key={el.name}>
            <div className={css.ThumbInner}>
              <video src={el.preview} className={css.Img} />
              <div className={css.Btn} onClick={() => props.removeVideo()}>
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
    video: state.imageReducer.video,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeVideo: () => dispatch(action.removeVideo()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Thumb);
