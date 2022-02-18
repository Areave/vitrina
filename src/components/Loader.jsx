import React from "react";

function Loader() {
  return (
    <>
      <div id="loader_div" className="open">
        <div id="loader_close">
          Zavřít <i className="fa fa-hand-pointer-o" aria-hidden="true"></i>{" "}
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