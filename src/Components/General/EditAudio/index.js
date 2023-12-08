import React, { useEffect } from "react";
import css from "./__.module.css";
import base from "../../../base";
const EditAudio = (props) => {
  return (
    <div className={css.Thumbs} key={props.file}>
      <div className={`${css.ThumbInner}`}>
        <audio
          controls
          src={`${base.cdnUrl}uploads/${props.file}`}
          className={css.Img}
        ></audio>
        <div className={css.Btn} onClick={() => props.click(props.index)}>
          x
        </div>
      </div>
    </div>
  );
};

export default EditAudio;
