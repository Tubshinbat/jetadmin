import React, { useState, useEffect } from "react";
// import { NgxDropzoneModule } from "ngx-dropzone";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import Thumbs from "./Thumbs";

import css from "./__.module.css";

import * as action from "../../redux/actions/newsUploadActions";

const Index = (props) => {
  const handleDrop = (acceptedFiles) => {
    acceptedFiles = [...props.files, ...acceptedFiles];
    let newFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    props.addVideos(acceptedFiles);
  };

  return (
    <div className={css.App}>
      <Dropzone onDrop={handleDrop} accept="video/*">
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className={css.Dropzone}>
            <input {...getInputProps()} />
            <i className="fas fa-cloud-upload-alt"></i>
            <p>Видеогоо энд дарж эсвэл зөөж оруулна уу.</p>
          </div>
        )}
      </Dropzone>
      <div className={css.FileName}>
        <strong>Видео:</strong>
        <aside>
          <Thumbs />
        </aside>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    files: state.newsUploadReducer.videos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addVideos: (acceptedFiles) => dispatch(action.addVideos(acceptedFiles)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
