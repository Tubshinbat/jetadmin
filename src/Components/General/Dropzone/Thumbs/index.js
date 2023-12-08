import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Thumb from "../Thumb";
import * as actions from "../../../../redux/actions/imageActions";
import css from "./__.module.css";

const Thumbs = (props) => {
  const [onePic, setOnePic] = useState("");

  useEffect(() => {}, []);

  useEffect(() => {
    setOnePic(() => props.files[props.files.length - 1]);
  }, [props.files]);

  return (
    <div className={css.Thumbs}>
      {props.files.map((file, key) =>
        props.onePicture ? (
          props.files.length - 1 === key ? (
            <Thumb file={file} removePhoto={props.removePhoto} key={key} />
          ) : null
        ) : (
          <Thumb file={file} removePhoto={props.removePhoto} />
        )
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    files: state.imageReducer.files,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removePhoto: (imgKey) => dispatch(actions.removePhoto(imgKey)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Thumbs);
