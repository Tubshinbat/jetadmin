import React from "react";
import css from "./__.module.css";
const Dropdown = (props) => {
  return (
    <div className={`${css.FormGroup} ${css.Open}`} key={props.who}>
      <button
        className={css.ScrollBtn}
        onClick={() => props.handleClick(props.who)}
      >
        {props.name} <i className="fas fa-angle-down"></i>
      </button>
      <div
        className={`${css.Dropdown} `}
        style={{
          display: props.show ? "block" : "none",
        }}
      >
        {props.data}
      </div>
    </div>
  );
};

export default Dropdown;
