import React from "react";

const CardBoby = (props) => {
  return (
    <div className={`card card-primary ${!props.outline && "card-outline"}`}>
      <div className="card-body">{props.children}</div>
    </div>
  );
};

export default CardBoby;
