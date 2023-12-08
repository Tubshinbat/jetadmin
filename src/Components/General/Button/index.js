import React from "react";

import css from "./__.module.css";
import "./__.generalbutton.css";

const Button = (props) => {
  return (
    <button
      onClick={props.clickHandle}
      className={`btn ${props.btnClass} ${css.Mybtn}`}
      name={props.name}
    >
      {props.addIcon && props.addIcon}
      {props.text}
    </button>
  );
};

export default Button;
