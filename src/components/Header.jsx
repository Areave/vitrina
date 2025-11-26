import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { emptyCart } from "./../reducers/cartReducer";
import { sliceBreadcrumb } from "./../reducers/catalogReducer";
import { resetCollaborator } from "./../reducers/collaboratorsRedusers";
import ChangeDate from "./modal/ChangeDate";

import logo_100czk from "../../public/img/logo_100czk.svg";
import bc_logo from "../../public/img/bc-logo.png";
import { resetDealer } from "../reducers/dealersRedusers";
import parametersReducer from "../reducers/parametersReducer";

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isChangeDateModal, setIsChangeDateModal] = useState(false);

    const collaborator = useSelector((state) => state.collabarators.item);
    const {kiosk_name} = useSelector((state) => state.parameters);
    const date = useSelector((state) => state.cart.date);
    const currentDealer = useSelector((state) => state.dealers.item);

    const handleOnClick = useCallback((url) => {
        dispatch(resetCollaborator());
        dispatch(sliceBreadcrumb(-1));
        dispatch(emptyCart());
        navigate(url, { replace: true }), [navigate];
    });


    const toggleChangeDateModal = () => {
        setIsChangeDateModal(!isChangeDateModal);
    };

    // console.log('currentDealer', currentDealer);

    return (
        <>
            <div id="header">
                <div className="logo clearfix">
                    {currentDealer && <div className="" style={{
                        padding: '0 5px',
                        height: '100%',
                        display: 'flex',
                        justifyContent:'space-between',
                        alignItems: 'center'
                    }} onClick={() => handleOnClick("/terminal")}>
                        {(!currentDealer || currentDealer.id === 0 )&& <img onClick={() => handleOnClick("/terminal")} id="logo" src={`${currentDealer.dealer_image_id ? global.config.protocol + '://' + global.config.apiHost + '/image?sid=0&object_id=' + dealer_image_id : logo_100czk}`} width="300" height="48" alt="Logo" />}
                        {currentDealer && (currentDealer.id === 48 || currentDealer.label === "BCT") && <img id="logo" src={bc_logo} width="48" height="48" alt="Logo" style={{margin: 'auto'}}/>}
                    </div>}
                </div>
                <a href="#" onClick={() => {
                    dispatch(resetDealer());
                    handleOnClick("/")}} id="signpost_url">
                    {" "}
                </a>
                <div id="time">
                    <i className="fa fa-calendar" aria-hidden="true"></i>
                    <br />
                    <i className="fa fa-clock-o" aria-hidden="true"></i>
                </div>
                {kiosk_name && <div className="kiosk_name">{kiosk_name}</div>}
                {date && collaborator && (
                    <div onClick={() => toggleChangeDateModal()} id="mass_date">
                        <span>Datum objednávky</span>
                        <br />
                        <i className="fa fa-calendar" aria-hidden="true"></i> {date}
                    </div>
                )}{" "}
                {!date && collaborator && (
                    <div id="change_date">
                        <a onClick={() => toggleChangeDateModal()} className="botton-change-date" href="#">
                            Změnit datum
                        </a>
                    </div>
                )}
                {collaborator && (
                    <div className="selected-employee">
                        <p id="employee-name">{`${collaborator.name}`}</p>
                        <a href="#" onClick={() => handleOnClick("/terminal")}>
                            Změnit
                        </a>
                    </div>
                )}
            </div>
            {isChangeDateModal && <ChangeDate toggleChangeDateModal={toggleChangeDateModal} />}
        </>
    );
}

export default Header;
