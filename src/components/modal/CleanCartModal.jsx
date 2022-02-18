import React from "react";
import { useDispatch } from "react-redux";
import { emptyCart } from "../../reducers/cartReducer";
import { resetModal } from "../../reducers/storageReducer";

function CleanCardModal() {
    const dispatch = useDispatch();

    const closeModal = () => {
        dispatch(resetModal());
    };

    const cleanCart = () => {
        dispatch(emptyCart());
        closeModal();
    };

    return (
        <>
            <div id="loader_div" className="open closeable">
                <div id="loader_close" onClick={() => closeModal()}>
                    Zavřít <i className="fa fa-hand-pointer-o" aria-hidden="true"></i> <i className="fa fa-window-close-o" aria-hidden="true"></i>
                </div>
                <i className="fa fa-question-circle-o" aria-hidden="true" id="loader"></i>
                <div id="loader_msg">
                    Opravdu si přejete vyprázdnit košík?
                    <br />
                    <a onClick={() => cleanCart()} style={{ marginRight: "100px" }} herf="#">
                        Ano
                    </a>
                    <a onClick={() => closeModal()} style={{ marginLeft: "100px", background: "#e7e7e7", color: "#da0000" }} herf="#">
                        Ne
                    </a>
                </div>
            </div>
        </>
    );
}

export default CleanCardModal;
