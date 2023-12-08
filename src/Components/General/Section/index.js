import React from "react";

import css from "./__.module.css";

const Section = (props) => {
  return (
    <div className={`content-wrapper ${css.Section}`}>
      <section className="content-header">{props.children}</section>
    </div>
  );
};

export default Section;
