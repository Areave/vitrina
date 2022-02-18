import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { emptyCart } from "../reducers/cartReducer";
import { sliceBreadcrumb } from "../reducers/catalogReducer";
import { resetModal } from "../reducers/storageReducer"
import Modal from "./modal/Modal";

import logo_100czk from '../../public/img/logo_100czk.svg'
import vitrina_logo from '../../public/img/vvitrina_logo.svg'

function Main() {
	const dispatch = useDispatch()

    const [isModal, setIsModal] = useState(false)
    const [modalName, setModalName] = useState(null)
    const [modalParams, setModalParams] = useState(null)
    const [modalPayload, setModalPayload] = useState(null)
	
    useEffect(() => {
		dispatch(emptyCart())
		dispatch(sliceBreadcrumb())
        dispatch(resetModal())
	}, [])

	
    const toggleIsModal = (params) => {
        setModalParams(params?.modalParams)
        setModalName(params?.modalName)
        setModalPayload(params?.modalPayload)
        setIsModal(!isModal)
    }


    return (
        <>
            <div id="signposts">
                <Link id="signpost_terminal" to="/terminal">
                    <img src={logo_100czk} alt="terminals" />
                    <br />
                    Terminál
                </Link>
                <Link to="/shop/?iframe=https://vvitrina.cz/">
					<img className="img-responsive" src={vitrina_logo} alt="VVitrina" />
				</Link>
                {/* <Link to="/reservation">Rezervace</Link> */}
                {/* <Link to toggleIsModal={()=>toggleIsModal()}>Inkasace</Link> */}
                <a onClick={()=>toggleIsModal({modalName:'collectionsModal', modalParams: {buttonClose:false}, modalPayload:null})}>Inkasace</a>
                {/* <Link to="--><!--?iframe=https://calendar.google.com/calendar/embed?src=100czkluka%40gmail.com&ctz=Europe%2FPrague" className="calendar">Kalendář</Link> */}
                {/* <Link to="/mass" className="mass">
                    Hromadné Zadání
                </Link> */}
                {/* <Link to toggleIsModal={()=>toggleIsModal()}>Tisk prohlášení</Link> */}
                <a onClick={()=>toggleIsModal({modalName:'receiptModal', modalParams: {buttonClose:false}, modalPayload:null})}>Tisk prohlášení</a>
            </div>
            {isModal && <Modal toggleIsModal={toggleIsModal} modalParams={modalParams} modalName={modalName} modalPayload={{modalPayload}}/>}
        </>
    );
}

export default Main;
