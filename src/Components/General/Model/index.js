import React, { useEffect, useState } from "react";

import Shadow from "../Shadow";

import css from "./__.module.css";
import "./style.css";

const Model = (props) => {
  const [showModel, setShowModel] = useState(false);

  useEffect(() => {
    setShowModel(props.show);
  }, [props.show]);

  const CloseModel = () => {
    props.handleToggle(false);
  };
  return (
    <>
      <div
        className={`modal fade show`}
        id="modal-default"
        style={{
          display: showModel ? "block" : "none",
        }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{props.modelName}</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={CloseModel}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">{props.children}</div>
          </div>
        </div>
      </div>
      <Shadow show={showModel} CloseModel={CloseModel} />
    </>
  );
};

export default Model;
