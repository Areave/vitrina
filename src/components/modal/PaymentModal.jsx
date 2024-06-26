import { set } from "date-fns";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetModal, setModal } from "../../reducers/storageReducer";
// import { sendPayment } from "./../actions/payment";
import { setAmountTips, setPaymentGateProccess } from "../../reducers/cartReducer";
import terminal_cancel from "../../../public/img/terminal_cancel.png";
import { cancelPayment } from "./../actions/cancelPayment";

function PaymentModal({ sendPayment }) {
    const dispatch = useDispatch();

    const closeModal = () => {
        dispatch(setPaymentGateProccess(false));
        dispatch(resetModal());
    };

    const modal = useSelector((state) => state.storage.modal);
    const amount = useSelector((state) => state.cart.amount);
    const amountTips = useSelector((state) => state.cart.amountTips);
    const isPaymentGateProccess = useSelector((state) => state.cart.isPaymentGateProccess);
    const isErrorFetching = useSelector((state) => state.cart.isErrorFetching);
    const errorPaymentGateResponse = useSelector((state) => state.cart.errorPaymentGateResponse);

    const [loaderDiv, setLoaderDiv] = useState("open");
    const [paymentMethod, setPaymentMethod] = useState(null);

    const clickPaymentMethod = (val = paymentMethod) => {
        if (val) {
            setPaymentMethod(val);
            dispatch(setModal({ buttonClose: true, name: "paymentMethodModal", step: 'PRINT_BILL' }))
        }
    };

    const [tips, setTips] = useState("");
    const accTips = (n) => {
        setTips(`${tips}${n}`);
    };
    const deccTips = () => {
        setTips(tips?.substring(0, tips.length - 1));
    };
    const applyTips = () => {
        dispatch(setAmountTips(Number(tips)));
        setTips("");
        dispatch(setModal({ buttonClose: true, name: "paymentMethodModal", step: "CHOOSE" }));
    };
    const cancelTips = () => {
        dispatch(setAmountTips(0));
        setTips("");
        dispatch(setModal({ buttonClose: true, name: "paymentMethodModal", step: "CHOOSE" }));
    };
    const clickPrintBill = (isPrintBill) => {
        sendPayment(paymentMethod, isPrintBill);
        dispatch(setModal({ buttonClose: false, name: "paymentMethodModal", step: null }));
    };
    const clickCancelPayment = () => {
        dispatch(cancelPayment());
        setPaymentMethod(null);
        dispatch(setPaymentGateProccess(false));
        closeModal();
    }

    useEffect(() => {
        setLoaderDiv(errorPaymentGateResponse ? "open closeable" : "open");
    }, [errorPaymentGateResponse]);

    // console.log("modal:", modal);

    if (!isPaymentGateProccess && modal.step === "TIPS") {
        return (
            <>
                <div id="tip" className="open">
                    <div id="payment_methods_header">
                        <span onClick={() => closeModal()}>
                            <font style={{ verticalAlign: "inherit" }}>
                                <font style={{ verticalAlign: "inherit" }}> Zavřít</font>
                            </font>
                            <i className="fa fa-hand-pointer-o" aria-hidden="true"></i> <i className="fa fa-window-close-o" aria-hidden="true"></i>
                        </span>
                    </div>
                    <div id="tip_body">
                        <div id="tip_calculator">
                            <span className="tip_calculator_header">Spropitné pro kadeřníka</span>
                            <input id="tip_input" value={tips} />
                            <span id="tip_inp_currency">Kč</span>
                            <div>
                                {/* {
                                Array(10)
                                    .fill(1)
                                    .reduce((acc, _, i) => acc + `<span className="tip_btn" onClick={()=>accTips(${i+1})}>${i+1}</span>`),''} */}

                                <span className="tip_btn" onClick={() => accTips(1)}>
                                    1
                                </span>
                                <span className="tip_btn" onClick={() => accTips(2)}>
                                    2
                                </span>
                                <span className="tip_btn" onClick={() => accTips(3)}>
                                    3
                                </span>
                                <span className="tip_btn" onClick={() => accTips(4)}>
                                    4
                                </span>
                                <span className="tip_btn" onClick={() => accTips(5)}>
                                    5
                                </span>
                                <span className="tip_btn" onClick={() => accTips(6)}>
                                    6
                                </span>
                                <span className="tip_btn" onClick={() => accTips(7)}>
                                    7
                                </span>
                                <span className="tip_btn" onClick={() => accTips(8)}>
                                    8
                                </span>
                                <span className="tip_btn" onClick={() => accTips(9)}>
                                    9
                                </span>
                                <span className="tip_btn" onClick={() => accTips(0)}>
                                    0
                                </span>
                                <span className="tip_btn backspace" onClick={() => deccTips()}>
                                    <i className="fa fa-angle-left"></i> Smazat
                                </span>
                            </div>
                            <div id="tip_footer">
                                <span className="tip_btn" onClick={() => cancelTips()}>
                                    Nemám zájem nechat spropitné pro kadeřníka (přeskočit)
                                </span>
                                <span className="tip_btn small submit" onClick={() => applyTips()}>
                                    <i className="fa fa-check"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    } else if (!isPaymentGateProccess && modal.step === "CHOOSE") {
        return (
            <>
                <div id="payment_methods" className="open">
                    <div id="payment_methods_header">
                        <span id="price_preview">
                            <font style={{ verticalAlign: "inherit" }}>
                                <font style={{ verticalAlign: "inherit" }}>Celkem: </font>
                            </font>
                            <span className="price">
                                <font style={{ verticalAlign: "inherit" }}>
                                    <font style={{ verticalAlign: "inherit" }}>
                                        {amount + (amountTips || 0)} {global.config.currency}
                                    </font>
                                </font>
                            </span>
                        </span>
                        <span onClick={() => closeModal()}>
                            <font style={{ verticalAlign: "inherit" }}>
                                <font style={{ verticalAlign: "inherit" }}> Zavřít</font>
                            </font>
                            <i className="fa fa-hand-pointer-o" aria-hidden="true"></i> <i className="fa fa-window-close-o" aria-hidden="true"></i>
                        </span>
                    </div>
                    <div id="payment_methods_body">
                        <div>
                            <button onClick={() => clickPaymentMethod("CARD")} className="cardPay">
                                <span className="show_price">
                                    <font style={{ verticalAlign: "inherit" }}>
                                        <font style={{ verticalAlign: "inherit" }}>Zaplatíte: </font>
                                    </font>
                                    <span className="price">
                                        <font style={{ verticalAlign: "inherit" }}>
                                            <font style={{ verticalAlign: "inherit" }}>
                                                {amount + (amountTips || 0)} {global.config.currency}
                                            </font>
                                        </font>
                                    </span>
                                </span>
                                <span>
                                    <span className="uppercase title">
                                        <font style={{ verticalAlign: "inherit" }}></font>
                                    </span>
                                    <span className="big-text">
                                        <font style={{ verticalAlign: "inherit" }}></font>
                                    </span>
                                    <span className="uppercase title">
                                        <font style={{ verticalAlign: "inherit" }}></font>
                                    </span>
                                </span>
                                <span style={{ paddingTop: "3.5vh" }}>
                                    <i className="fa fa-credit-card-alt big-text" aria-hidden="true"></i>
                                    <span>
                                        <font style={{ verticalAlign: "inherit" }}>
                                            <font style={{ verticalAlign: "inherit" }}>Kartou</font>
                                        </font>
                                    </span>
                                </span>
                            </button>
                        </div>
                        <div>
                            <button onClick={() => clickPaymentMethod("CASH")}>
                                <span className="show_price">
                                    <font style={{ verticalAlign: "inherit" }}>
                                        <font style={{ verticalAlign: "inherit" }}>Zaplatíte: </font>
                                    </font>
                                    <span className="price">
                                        <font style={{ verticalAlign: "inherit" }}>
                                            <font style={{ verticalAlign: "inherit" }}>
                                                {amount + (amountTips || 0)} {global.config.currency}
                                            </font>
                                        </font>
                                    </span>
                                </span>
                                <i className="fa fa-money" aria-hidden="true"></i>
                                <span>
                                    <font style={{ verticalAlign: "inherit" }}>
                                        <font style={{ verticalAlign: "inherit" }}>Hotově</font>
                                    </font>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    } else if (!isPaymentGateProccess && modal.step === 'PRINT_BILL') {
        return (
            <>
                <div id="payment_methods" className="open">
                    <div id="payment_methods_header">
                        <span id="price_preview">
                            <font style={{ verticalAlign: "inherit" }}>
                                <font style={{ verticalAlign: "inherit" }}>Celkem: </font>
                            </font>
                            <span className="price">
                                <font style={{ verticalAlign: "inherit" }}>
                                    <font style={{ verticalAlign: "inherit" }}>
                                        {amount + (amountTips || 0)} {global.config.currency}
                                    </font>
                                </font>
                            </span>
                        </span>
                        <span onClick={() => closeModal()}>
                            <font style={{ verticalAlign: "inherit" }}>
                                <font style={{ verticalAlign: "inherit" }}> Zavřít</font>
                            </font>
                            <i className="fa fa-hand-pointer-o" aria-hidden="true"></i> <i className="fa fa-window-close-o" aria-hidden="true"></i>
                        </span>
                    </div>
                    <div id="loader_msg">
                        <h2>Tisknout účtenku</h2>
                        <div>
                            <a
                                onClick={() => clickPrintBill(false)}
                                href="#"
                            >
                                Ne
                            </a>&nbsp;
                            <a
                                onClick={() => clickPrintBill(true)}
                                href="#"
                            >
                                Ano
                            </a>
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div id="loader_div" className={loaderDiv}>
                    {/* <div id="loader_close" onClick={() => togglePaymenMethodModal(false)}>
                        Zavřít <i className="fa fa-hand-pointer-o" aria-hidden="true"></i> <i className="fa fa-window-close-o" aria-hidden="true"></i>
                    </div> */}

                    {errorPaymentGateResponse ? (
                        <>
                            <i className="fa fa-exclamation-triangle red" aria-hidden="true" id="loader"></i>
                            <div id="loader_msg">
                                {errorPaymentGateResponse?.status + ": " || ""} {errorPaymentGateResponse?.message || "Chyba brány"}
                                <br />
                                <a onClick={() => closeModal()} href="#">
                                    Zavřít
                                    {/* Znovu odeslat */}
                                </a>
                            </div>
                        </>
                    ) : (
                        <>
                            <div id="loader">
                                <i className="fa fa-money" aria-hidden="true"></i>
                                {paymentMethod === "CARD" ? (
                                    <div id="loader_img">
                                        <img src={terminal_cancel} />
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                            {paymentMethod === "CARD" ? (
                                <div id="loader_msg">Pro zrušení platby stiskněte červené tlačítko na POS terminálu</div>
                            ) : (
                                <>
                                    <i className="fa fa-money" aria-hidden="true" id="loader"></i>
                                    <div id="loader_msg">
                                        {/* <button onClick={() => clickCancelPayment()}>
                                <span>
                                    <font style={{ verticalAlign: "inherit" }}>
                                        <font style={{ verticalAlign: "inherit" }}>Zruseni platby</font>
                                    </font>
                                </span>
                            </button> */}
                                        <a
                                            onClick={clickCancelPayment}
                                            href="#"
                                        >
                                            Zruseni platby
                                        </a>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>
            </>
        );
    }
}

export default PaymentModal;
