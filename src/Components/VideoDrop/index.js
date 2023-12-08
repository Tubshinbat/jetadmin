import React, { useState, useEffect } from "react";
// import { NgxDropzoneModule } from "ngx-dropzone";
import { connect } from "react-redux";
// import Dropzone from "react-dropzone";
import { useDropzone } from "react-dropzone";

import css from "./__.module.css";

import * as action from "../../redux/actions/imageActions";
import Thumb from "./Thumb";

const DropVideo = (props) => {
  const [files, setFiles] = useState([]);

  const { fileRejections, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: "video/*",
    onDrop: (acceptedFiles) => {
      props.addVideo(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div key={file.name}>
      <div>
        <img src={file.preview} />
      </div>
    </div>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => {
    return (
      <li key={file.path} className={css.ListError}>
        {file.path} - {file.size} bytes
        <ul>
          {errors.map((e) => (
            <li key={e.code} className={css.MsgError}>
              {e.message}
            </li>
          ))}
        </ul>
      </li>
    );
  });

  return (
    <div className={css.App}>
      <div {...getRootProps({ className: css.Dropzone })}>
        <input {...getInputProps()} />
        <p>Видеогоо энд дарж эсвэл зөөж оруулна уу.</p>
        <em>(дээд тал 1 видео оруулах боломжтой)</em>
      </div>

      <aside className={css.ErrorMsg}>
        <h4>Алдаатай файлууд</h4>
        <ul>{fileRejectionItems}</ul>
      </aside>

      <div className={css.FileName}>
        <strong>Оруулсан видео:</strong>
        <aside>
          <Thumb />
        </aside>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    video: state.imageReducer.video,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addVideo: (acceptedFiles) => dispatch(action.addVideo(acceptedFiles)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DropVideo);
