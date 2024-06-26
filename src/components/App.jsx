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
import { getDealers } from "./actions/dealers";
import { getCatalog } from "./actions/catalog";
import Loader from "./Loader";
import LoadingDataError from "./LoadingDataError";
import { emptyCart } from "../reducers/cartReducer";
import { resetCollaborator } from "../reducers/collaboratorsRedusers";
import ErrorPayment from "./ErrorPayment";
import axios from 'axios'

function App() {
    // const dispatch = useDispatch();
    // const collaborators = useSelector((state) => state.collabarators);
    // const dealers = useSelector((state) => state.dealers);
    // const catalog = useSelector((state) => state.catalog);

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    // const urlParam = new URLSearchParams(window.location.search);
    // let token_key = urlParam.get("token_key");
    // console.log("token_key", token_key);

    const getParams = function(url) {
        var params = {};
        var parser = document.createElement("a");
        parser.href = url;
        var query = parser.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            params[pair[0]] = decodeURIComponent(pair[1]);
        }
        return params;
    };

    {/*useEffect(async () => {*/}
    {/*    const protocol = getParams(document.location.href)?.protocol*/}
    {/*    const api_host = getParams(document.location.href)?.api_host*/}
    {/*    const api_pref = getParams(document.location.href)?.api_pref*/}
    {/*    const sid = getParams(document.location.href)?.token_key;*/}

    {/*    const config = {*/}
    {/*        protocol: protocol || 'https',*/}
    //         apiHost: api_host || 'api.dev.100czk.cz',
    //         apiPrefix: api_pref ?? 'api_v2',
    //         sid: sid,
    //         currency: 'Kč'
    //     };
    //     window.config = config;
    {/*    console.log('sid');*/}
    {/*    console.log(sid);*/}


    {/*    let url = `${config.protocol}://${config.apiHost}${config.apiPrefix ? "/" + config.apiPrefix : ""}/get_token_by_session_key${global.config.sid ? '?sid=' + sid : ''}`;*/}
    {/*    // let url = `${global.config.protocol}://${global.config.apiHost}${global.config.apiPrefix ? "/" + global.config.apiPrefix : ""}/get_token_by_session_key`;*/}
    {/*    // console.log('url блять');*/}
    {/*    console.log(url);*/}
    {/*    let data = { session_key: config.sid };*/}
    {/*    // setIsLoading(true);*/}
    {/*    console.log("url", url);*/}
    {/*    const response = await axios({*/}
    {/*        method: "POST",*/}
    {/*        url: url,*/}
    {/*        headers: {*/}
    {/*            "Content-Type": "application/json",*/}
    {/*            // "Authorization": `Bearer ${sid}`*/}
    //         },
    //         data
    //     });
    //
    //     if (response?.data?.data?.token) {
    //         global.config.sid = response.data.data.token;
    //         console.log('успех');
    //         // setIsLoading(false);
    //     } else {
    //         console.log('ошибка');
    //         console.log(response.data);
    //         setIsError(true);
    //         // setIsLoading(false);
    {/*    }*/}
    {/*    setIsLoading(false);*/}

    //     //     .then((data) => {
    //     //     console.log("data.data.data", data.data.data);
    //     //     global.config.sid = data.data.data.token;
    //     //     console.log("global.config.sid", global.config.sid);
    //     // }).catch((error) => {
    //     //     console.log('error блять');
    //     //     console.log(error);
    //     //     setIsError(true);
    //     // }).finally(() => {
    //     //     setIsLoading(false);
    //     // });
    //
    //
    // }, []);


    if (isLoading) {
        return <Loader/>;
    }

    if (isError) {
        return <BrowserRouter>
            <Header/>
            <LoadingDataError/>
        </BrowserRouter>;
    }

    return (
        <>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route exact path="/" element={<Main/>}/>
                    <Route exact path="/terminal" element={<WrapperTerminal/>}/>
                    {/*<Route exact path="/terminalbs" element={<WrapperTerminal button={true}/>} />*/}
                    {/* <Route exact path="/terminal/:name" element={<TerminalCatalog />} /> */}
                    <Route exact path="/shop" element={<Shop/>}/>
                    {/*<Route exact path="/reservation" element={<Reservation />} />*/}
                    <Route path="/error-payment" element={<ErrorPayment/>}/>
                    <Route exact path="*" element={<Error404/>}/>
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
