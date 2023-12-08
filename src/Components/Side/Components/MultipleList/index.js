import React from "react";

const MultipleList = (props) => {
  return (
    <li className={`nav-item has-treeview `}>
      <a href="#" className={`nav-link`}>
        <i className={props.icon}></i>
        <p>
          {props.name}
          <i className="right fas fa-angle-left"></i>
        </p>
      </a>
      <ul className="nav nav-treeview">{props.children}</ul>
    </li>
  );
};

export default MultipleList;
