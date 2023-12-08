import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = (props) => {
  return (
    <li className="nav-item">
      <NavLink
        exact={props.exact}
        className="nav-link"
        activeClassName="active"
        to={props.link}
      >
        {props.children}
      </NavLink>
    </li>
  );
};

export default NavItem;
