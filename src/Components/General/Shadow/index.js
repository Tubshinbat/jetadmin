import React from "react";

const Shadow = (props) => {
  return (
    <div
      className={` ${props.show === true && "modal-backdrop  fade show"}`}
    ></div>
  );
};

export default Shadow;
