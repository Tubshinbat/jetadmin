import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Thumb from "../Thumb";
import * as actions from "../../../redux/actions/newsUploadActions";
import css from "./__.module.css";

const Thumbs = (props) => {
  useEffect(() => {
    console.log(props.videos);
  }, [props.videos]);

  return (
    <div className={css.Thumbs}>
      {props.videos.map((file, key) => (
        <Thumb file={file} removeVideos={props.removeVideos} key={key} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    videos: state.newsUploadReducer.videos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeVideos: (imgKey) => dispatch(actions.removeVideos(imgKey)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Thumbs);
