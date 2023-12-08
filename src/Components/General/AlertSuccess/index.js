import React from "react";

const AlertSuccess = (props) => {
  return (
    <div className="alert alert-success alert-dismissible">
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-hidden="true"
      >
        ×
      </button>
      {props.children}
    </div>
  );
};

export default AlertSuccess;
