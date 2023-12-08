import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Thumb from "../Thumb";
import * as actions from "../../../redux/actions/newsUploadActions";
import css from "./__.module.css";

const Thumbs = (props) => {
  return (
    <div className={css.Thumbs}>
      {props.audios.map((file, key) => (
        <Thumb file={file} removeAudio={props.removeAudio} key={key} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    audios: state.newsUploadReducer.audios,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeAudio: (imgKey) => dispatch(actions.removeAudio(imgKey)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Thumbs);
