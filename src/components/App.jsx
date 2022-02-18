import React, { useEffect, useState, useTransition } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import WrapperTerminal from "./WrapperTerminal";
import Shop from "./Shop";
import Reservation from "./Reservation";
import Error404 from "./Error404";
import { useDispatch, useSelector } from "react-redux";
import { getCollaborators } from "./actions/collaborators";
import { getCatalog } from "./actions/catalog";
import Loader from "./Loader";
import LoadingDataError from "./LoadingDataError";
import { emptyCart } from "../reducers/cartReducer";
import { resetCollaborator } from "../reducers/collaboratorsRedusers";
import ErrorPayment from "./ErrorPayment";

function App() {
  const dispatch = useDispatch();
  const collaborators = useSelector((state) => state.collabarators);
  const catalog = useSelector((state) => state.catalog);

  useEffect(() => {
    dispatch(getCollaborators());
    dispatch(getCatalog());
    dispatch(resetCollaborator());
  }, []);

  if (collaborators?.isError) {
    return (
      <>
        <BrowserRouter>
          <Header />
          <LoadingDataError />
        </BrowserRouter>
      </>
    );
  } else if (collaborators?.items?.length && catalog?.items?.categories) {
    const url = window.location.origin

    return (
      <>
        <BrowserRouter >
          <Header />
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route exact path="/terminal" element={<WrapperTerminal />} />
            {/* <Route exact path="/terminal/:name" element={<TerminalCatalog />} /> */}
            <Route exact path="/shop" element={<Shop />} />
            <Route exact path="/reservation" element={<Reservation />} />
            <Route path="/error-payment" element={<ErrorPayment />} />
            <Route exact path="*" element={<Error404 />} />
            {/* <Route exact path="*" element={<Error404 />} /> */}
          </Routes>
        </BrowserRouter>
      </>
    );
  } else {
    return (
      <>
        <BrowserRouter>
          <Header />
          <Loader />
        </BrowserRouter>
      </>
    );
  }
}

export default App;
