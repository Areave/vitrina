import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCollaborators } from "./actions/collaborators";
import { getCatalog } from "./actions/catalog";
import { getCurrentToken } from "../config";

function LoadingDataError({ toggleCleanCartModal }) {
  const dispatch = useDispatch();
  const [countGetData, setCountGetData] = useState(0);

  useEffect(() => {
      // const token = getCurrentToken();
      // // console.log("token", token);
      // if (token) {
        dispatch(getCollaborators());
        dispatch(getCatalog());
    // }
  }, [countGetData]);

  const retryGetData = () => {
    setCountGetData(countGetData + 1);
  };

  return (
    <>
      <div id="loader_div" className="open closeable">
        <i
          className="fa fa-question-circle-o"
          aria-hidden="true"
          id="loader"
        ></i>
        <div id="loader_msg">
          Chyba při získávání dat ze serveru
          <br />
          <a herf="#" onClick={() => retryGetData()}>
            Aktualizace
          </a>
        </div>
      </div>
    </>
  );
}

export default LoadingDataError;
