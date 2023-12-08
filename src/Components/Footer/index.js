import React from "react";
import css from "./__.module.css";
const Footer = () => {
  return (
    <div>
      <footer className={`main-footer ${css.Footer}`}>
        <strong></strong>

        <div className="float-right d-none d-sm-inline-block">
          <b>Хувилбар</b> 1.3
        </div>
      </footer>
    </div>
  );
};

export default Footer;
