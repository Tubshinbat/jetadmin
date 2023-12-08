import React, { useEffect } from "react";
import css from "./__.module.css";

const Thumb = (props) => {
  return (
    <div className={css.Thumbs} key={props.file.name}>
      <div className={css.ThumbInner}>
        <img src={props.file.preview} className={css.Img} />
        <div className={css.Btn} onClick={() => props.removePhoto(props.key)}>
          x
        </div>
      </div>
    </div>
  );
};

export default Thumb;
