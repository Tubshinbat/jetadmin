import React, { useEffect } from "react";
import css from "./__.module.css";
import base from "../../../base";
const EditImage = (props) => {
  return (
    <div className={css.Thumbs} key={props.file}>
      <div className={`${css.ThumbInner}`}>
        <img src={`${base.cdnUrl}uploads/${props.file}`} className={css.Img} />
        <div className={css.Btn} onClick={() => props.click(props.index)}>
          x
        </div>
      </div>
    </div>
  );
};

export default EditImage;
