import React from "react";

import css from "./__.module.css";

const ModelFooter = (props) => {
  return (
    <div className={`modal-footer justify-content-between ${css.ModelFooter}`}>
      {props.children}
    </div>
  );
};

export default ModelFooter;
