import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { emptyCart } from "../reducers/cartReducer";
import { sliceBreadcrumb } from "../reducers/catalogReducer";
import { resetModal } from "../reducers/storageReducer";
import Modal from "./modal/Modal";
import SalonButton from "./SalonButton";
import vitrina_logo from "../../public/img/vvitrina_logo.svg";
import logo_100czk from "../../public/img/logo_100czk.svg";
import LoadingDataError from "./LoadingDataError";
import { getDealers } from "./actions/dealers";
import { getCollaborators } from "./actions/collaborators";
import { getCatalog } from "./actions/catalog";
import Loader from "./Loader";

function Main() {
    const dispatch = useDispatch();
    const dealers = useSelector((state) => state.dealers);

    const [isModal, setIsModal] = useState(false);
    const [modalName, setModalName] = useState(null);
    const [modalParams, setModalParams] = useState(null);
    const [modalPayload, setModalPayload] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!dealers.items) {
            setIsLoading(true);
            dispatch(getDealers());
        }
    }, []);

    useEffect(() => {
        if (dealers.items && isLoading) {
            setIsLoading(false);
        }
    }, [dealers]);

    useEffect(() => {
        if (dealers.item) {
            // console.log("dealer #", dealers.item.id);
            localStorage.setItem("currentDealer", dealers.item);
        }
    }, [dealers.item]);

    useEffect(() => {
        dispatch(emptyCart());
        dispatch(sliceBreadcrumb());
        dispatch(resetModal());
    }, []);


    const toggleIsModal = (params) => {
        setModalParams(params?.modalParams);
        setModalName(params?.modalName);
        setModalPayload(params?.modalPayload);
        setIsModal(!isModal);
    };

    if (dealers.isError) {
        return <LoadingDataError/>;
    }

    if (isLoading) {
        return <Loader/>;
    }

    return (
        <>
            <div id="signposts">
                {dealers.items?.length > 0 && dealers.items.map(dealer => {
                    return <SalonButton key={dealer.id} dealer={dealer}/>;
                })}
                <Link to="/shop/?iframe=https://vvitrina.cz/">
                    <img className="img-responsive" src={vitrina_logo} alt="VVitrina"/>
                </Link>
                <a onClick={() => toggleIsModal({
                    modalName: "collectionsModal",
                    modalParams: { buttonClose: false },
                    modalPayload: null
                })}>Inkasace</a>
                <a onClick={() => toggleIsModal({ modalName: "receiptModal", modalParams: { buttonClose: false }, modalPayload: null })}>Tisk
                    prohlášení</a>

            </div>

            {isModal && <Modal toggleIsModal={toggleIsModal} modalParams={modalParams} modalName={modalName} modalPayload={{ modalPayload }}/>}
        </>
    );
}

export default Main;
