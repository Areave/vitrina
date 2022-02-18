import React from "react";
import {useNavigate} from 'react-router-dom';

function ErrorPayment() {
    const navigate = useNavigate();
    return (
        <>
            <div id="loader_div" className="open">
                <div id="loader_close">
                    Zavřít <i className="fa fa-hand-pointer-o" aria-hidden="true"></i> <i className="fa fa-window-close-o" aria-hidden="true"></i>
                </div>
                <i className="fa fa-exclamation-triangle red" aria-hidden="true" id="loader"></i>
                <div id="loader_msg">
                    Сhyba platebního systému
                    <br />
                    <a
                        onClick={() => {
                            return navigate("/");
                        }}
                        href="#"
                    >
                        chyba platebního systému
                    </a>
                </div>
            </div>
        </>
    );
}

export default ErrorPayment;
