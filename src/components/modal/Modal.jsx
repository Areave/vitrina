import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CollectionsModal from "./CollectionsModal";
import ReceiptModal from "./ReceiptModal";

function Modal({ toggleIsModal, modalParams, modalName, modalPayload }) {
    const dispatch = useDispatch();
    const [isButtonClose, setButtonClose] = useState(modalParams?.buttonClose)
    const [isLoader, setIsLoader] = useState(true);

    return (
        <>
            <div id="loader_div" className="open closeable">
                {isButtonClose && (
                    <div id="loader_close" onClick={() => toggleIsModal()}>
                        Zavřít <i className="fa fa-hand-pointer-o" aria-hidden="true"></i> <i className="fa fa-window-close-o" aria-hidden="true"></i>
                    </div>
                )}
                {modalName === "collectionsModal" && <CollectionsModal setButtonClose={setButtonClose} payload={modalPayload} />}
                {modalName === "receiptModal" && <ReceiptModal setButtonClose={setButtonClose} payload={modalPayload} />}
            </div>
        </>
    );
}

export default Modal;
