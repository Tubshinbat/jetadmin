import React, { useEffect } from "react";
import css from "./__.module.css";

const Thumb = (props) => {
  return (
    <div className={css.Thumbs} key={props.file.name}>
      <div className={css.ThumbInner}>
        <video controls src={props.file.preview}></video>
        <div className={css.Btn} onClick={() => props.removeVideos(props.key)}>
          x
        </div>
      </div>
    </div>
  );
};

export default Thumb;
