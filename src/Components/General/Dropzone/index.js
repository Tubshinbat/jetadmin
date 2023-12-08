import React, { useState, useEffect } from "react";
// import { NgxDropzoneModule } from "ngx-dropzone";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import Thumbs from "./Thumbs";

import css from "./__.module.css";

import * as action from "../../../redux/actions/imageActions";

const Index = (props) => {
  const handleDrop = (acceptedFiles) => {
    acceptedFiles = [...props.files, ...acceptedFiles];
    let newFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    props.addPhoto(acceptedFiles);
  };

  return (
    <div className={css.App}>
      <Dropzone
        onDrop={handleDrop}
        accept="image/*"
        // minSize={1024}
        // maxSize={3072000}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className={css.Dropzone}>
            <input {...getInputProps()} />
            <i className="fas fa-cloud-upload-alt"></i>
            <p>Зургаа энд дарж эсвэл зөөж оруулна уу.</p>
          </div>
        )}
      </Dropzone>
      <div className={css.FileName}>
        <strong>Зургууд:</strong>
        <aside>
          <Thumbs onePicture={props.onePicture} />
        </aside>
      </div>
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
    addPhoto: (acceptedFiles) => dispatch(action.addPhoto(acceptedFiles)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
