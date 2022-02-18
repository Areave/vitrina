import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { printReceipt } from "../actions/receipt";

function ReceiptModal({ setButtonClose, payload }) {
    const dispatch = useDispatch();

    const [activeContent, setActiveContent] = useState(undefined);

    const exexRequestCollection = () => {
        setActiveContent(undefined);
        dispatch(printReceipt()).then((resolve) => {
            if (resolve?.status == "OK") {
                setActiveContent("OK");
                setTimeout(() => {
                    window.location.replace(`/?token_key=${global.config.sid}`);
                }, 2000);
            } else if (resolve?.status == "FAIL") {
                setActiveContent("FAIL");
                setButtonClose(true);
            } else {
                setActiveContent("ERROR");
                setButtonClose(true);
            }
        });
    };

    useEffect(() => {
        exexRequestCollection();
    }, []);

    return (
        <>
            <div>COLLECTION MODAL</div>
            {activeContent === undefined && <i className="fa fa-spinner fa-pulse" aria-hidden="true" id="loader"></i>}
            {activeContent === "OK" && (
                <>
                    <i className="fa fa-check" aria-hidden="true" id="loader"></i>
                    <div id="loader_msg">Operace úspěšně dokončena...</div>
                </>
            )}
            {activeContent === "FAIL" && (
                <>
                    <i className="fa fa-exclamation-triangle red" aria-hidden="true" id="loader"></i>
                    <div id="loader_msg">
                        "Něco se pokazilo"
                        <br />
                        <a
                            onClick={() => {
                                exexRequestCollection();
                            }}
                            href="#"
                        >
                            Znovu odeslat
                        </a>
                    </div>
                </>
            )}
            {activeContent === "ERROR" && (
                <>
                    <i className="fa fa-exclamation-triangle red" aria-hidden="true" id="loader"></i>
                    <div id="loader_msg">
                        "Něco se pokazilo"
                        <br />
                        <a
                            onClick={() => {
                                exexRequestCollection();
                            }}
                            href="#"
                        >
                            Znovu odeslat
                        </a>
                    </div>
                </>
            )}
        </>
    );
}

export default ReceiptModal;
