import React, { useEffect } from "react";
import css from "./__.module.css";
import { connect } from "react-redux";
import * as action from "../../../redux/actions/imageActions";

const Thumb = (props) => {
  return (
    <>
      {props.icon &&
        props.icon.map((el) => (
          <div className={css.Thumbs} key={el.name}>
            <div className={css.ThumbInner}>
              <img src={el.preview} className={css.Img} />
              <div className={css.Btn} onClick={() => props.removeIcon()}>
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
    icon: state.imageReducer.icon,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeIcon: () => dispatch(action.removeIcon()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Thumb);
