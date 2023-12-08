import React from "react";

const AlertWarning = (props) => {
  return (
    <div className="alert alert-info alert-dismissible">
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-hidden="true"
      >
        ×
      </button>
      <h5>
        <i className="icon fas fa-exclamation-triangle" /> Анхаар!
      </h5>
      {props.children}
    </div>
  );
};

export default AlertWarning;
