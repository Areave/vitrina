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

    const urlParam = new URLSearchParams(window.location.search);
    let token_key = urlParam.get('token_key');
    console.log("token_key", token_key);

    if (!token_key) {
        // apiUrl = 'https://api.dev.100czk.cz/api_v2/';
    }

    // useEffect(() => {
    //     dispatch(getCollaborators());
    // }, []);

    // useEffect(() => {
    //     let sid = urlParam.get('token_key');
    //     if (sid) {
    //         setSid(sid);
    //     } else {
    //         if (process.env.NODE_ENV === 'production') {
    //             // TODO: обработать случай отсутствия sid в production
    //         } else {
    //             setIsLoading(true);
    //             apiService.getTestToken().then(response => setSid(response.data.key));
    //         }
    //     }
    // }, []);

    useEffect(() => {
        // dispatch(getCollaborators());
        // dispatch(getCatalog());
        // dispatch(resetCollaborator());
    }, []);

    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route exact path="/" element={<Main />} />
                    <Route exact path="/terminal" element={<WrapperTerminal />} />
                    <Route exact path="/terminalbs" element={<WrapperTerminal button={true}/>} />
                    {/* <Route exact path="/terminal/:name" element={<TerminalCatalog />} /> */}
                    <Route exact path="/shop" element={<Shop />} />
                    {/*<Route exact path="/reservation" element={<Reservation />} />*/}
                    <Route path="/error-payment" element={<ErrorPayment />} />
                    <Route exact path="*" element={<Error404 />} />
                    {/* <Route exact path="*" element={<Error404 />} /> */}
                </Routes>
            </BrowserRouter>
        </>
    );

    // if (collaborators?.isError) {
    //     return (
    //         <>
    //             <BrowserRouter>
    //                 <Header />
    //                 <LoadingDataError />
    //             </BrowserRouter>
    //         </>
    //     );
    // } else if (collaborators?.items?.length && catalog?.items?.categories) {
    //     const url = window.location.origin;
    //
    //     return (
    //         <>
    //             <BrowserRouter>
    //                 <Header />
    //                 <Routes>
    //                     <Route exact path="/" element={<Main />} />
    //                     <Route exact path="/terminal" element={<WrapperTerminal />} />
    //                     <Route exact path="/terminalbs" element={<WrapperTerminal button={true}/>} />
    //                     {/* <Route exact path="/terminal/:name" element={<TerminalCatalog />} /> */}
    //                     <Route exact path="/shop" element={<Shop />} />
    //                     {/*<Route exact path="/reservation" element={<Reservation />} />*/}
    //                     <Route path="/error-payment" element={<ErrorPayment />} />
    //                     <Route exact path="*" element={<Error404 />} />
    //                     {/* <Route exact path="*" element={<Error404 />} /> */}
    //                 </Routes>
    //             </BrowserRouter>
    //         </>
    //     );
    // } else {
    //     return (
    //         <>
    //             <BrowserRouter>
    //                 <Header />
    //                 <Loader />
    //             </BrowserRouter>
    //         </>
    //     );
    // }
}

export default App;
