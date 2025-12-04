import React from "react";
import { useTranslation } from "react-i18next";

function Loader() {
  const {t} = useTranslation();
  return (
    <>
      <div id="loader_div" className="open">
        <div id="loader_close">
          {t('close')} <i className="fa fa-hand-pointer-o" aria-hidden="true"></i>{" "}
          <i className="fa fa-window-close-o" aria-hidden="true"></i>
        </div>
        <i
          className="fa fa-spinner fa-pulse"
          aria-hidden="true"
          id="loader"
        ></i>
        <div id="loader_msg"></div>
      </div>
    </>
  );
}

export default Loader;