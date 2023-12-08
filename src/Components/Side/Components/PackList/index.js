import React from "react";

const PackList = (props) => {
  return (
    <>
      {props.name && <li className="nav-header">{props.name}</li>}
      {props.children}
    </>
  );
};

export default PackList;
