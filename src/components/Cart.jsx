import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addProduct,
    removeProduct,
    emptyCart,
    setPaymentGateProccess,
} from "../reducers/cartReducer";
import CleanCartModal from "./modal/CleanCartModal";
import PaymentModal from "./modal/PaymentModal";
import { sendPaymentToGate } from "./actions/payment";
import { resetModal, setModal } from "../reducers/storageReducer";
import BarcodeReader from "react-barcode-reader";

const Cart = () => {
    const dispatch = useDispatch();

    const modal = useSelector((state) => state.storage.modal);

    const openModal = (newModal) => {
        newModal = {
            buttonClose: true,
            ...newModal,
        };
        dispatch(setModal(newModal));
        if (newModal.name === "paymenMethodModal") {
            dispatch(setPaymentGateProccess(false));
        }
    };

    /*
     */
    const collaborator = useSelector((state) => state.collabarators.item);
    const cart = useSelector((state) => state.cart.items);
    // const serviceFee = useSelector((state) => state.cart.serviceFee);
    const [isPaymentModal, setIsPaymentModal] = useState(false);
    const [isClearCartModal, setIsCleanCartModal] = useState(false);
    const [barcode, setBarcode] = useState(null);

    const matchCart = [];
    const matchCount = [];
    const amount = useSelector((state) => state.cart.amount);
    const amountTips = useSelector((state) => state.cart.amountTips);
    const date = useSelector((state) => state.cart.date);
    let catalog = useSelector((state) => state.catalog.items);

    cart.forEach((item) => {
        matchCount[item.id] = matchCount[item.id] + 1 || 1;
        if (!matchCart.find((m) => m.id === item.id)) {
            matchCart.push(item);
        }
    });

    const add = (item) => {
        dispatch(addProduct(item));
    };

    const remove = (id) => {
        dispatch(removeProduct(id));
    };

    const sendPayment = (paymentMethod) => {
        dispatch(
            sendPaymentToGate({
                paymentMethod,
                amount,
                amountTips,
                date,
                customerId: collaborator.id,
                customerName: collaborator.name,
                // goods: cart.map((item) => item.id),
                // goods: cart.reduce((acc, item) => {
                //     if (acc.find((itemAcc) => itemAcc?.id === item.id)) {
                //         return acc?.map((itemAcc) =>
                //             itemAcc.id === item.id ? { id: itemAcc.id, count: itemAcc.count + 1, price: itemAcc.price + item.price } : item
                //         );
                //     }
                //     return [...acc, { id: item.id, count: 1, price: item.price }];
                // }, []),
                goods: cart.reduce((acc, item) => {
                    if (acc.find((itemAcc) => itemAcc?.id === item.id)) {
                        return acc?.map((itemAcc) =>
                            itemAcc.id === item.id
                                ? {
                                      id: itemAcc.id,
                                      count: itemAcc.count + 1,
                                      price: itemAcc.price + item.price,
                                  }
                                : itemAcc
                        );
                    }
                    return [...acc, { id: item.id, count: 1, price: item.price }];
                }, []),
            })
        );
    };

    function findGood(catalog, barcode) {
        const good = catalog?.products?.find(
            (good) => good.barcode?.toString() === barcode?.toString()
        );
        if (good) return good;
        for (let category of catalog?.categories || []) {
            const good = findGood(category, barcode);
            if (good) return good;
        }
    }

    const handleScan = (barcode) => {
        // alert(typeof barcode, barcode);
        const good = findGood(catalog, barcode);
        if (good) {
            console.log("good:", good);
            dispatch(addProduct(good));
        }
    };

    // const isServiceFee = () => {
    //     console.log(cart);
    //     const res = cart.some((item) => item?.type === "GOODS_SERVICE_FEE");
    //     useEffect(() => {
    //         if (!res) {
    //             dispatch(setServiceToDo("zero"));
    //         } else if (!serviceFee.count) {
    //             dispatch(setServiceToDo("add"));
    //         }
    //     }, [cart]);
    //     return res;
    // };
    return (
        <>
            <BarcodeReader onScan={handleScan} minLength="6" />
            <div id="cart">
                <div className="cart-header">
                    <h2>
                        Košík
                        {cart?.length ? (
                            <a
                                id="cart_trash"
                                className="fa fa-trash"
                                onClick={() =>
                                    openModal({ name: "cleanCartModal", buttonClose: true })
                                }
                                href="#"
                            ></a>
                        ) : (
                            ""
                        )}
                    </h2>
                </div>
                <div id="cart-products" className="cart-products">
                    {/* {isServiceFee() ? (
                        <div className="cart-item">
                            <span className="cart-item-name">Goods Service Fee</span>
                            <div className="flex">
                                <a className="cart-item-remove fa fa-minus" onClick={() => dispatch(setServiceToDo("remove"))}></a>
                                <span className="cart-item-quantity">{serviceFee.count} ks</span>
                                <a className="cart-item-remove fa fa-plus" onClick={() => dispatch(setServiceToDo("add"))}></a>
                            </div>
                        </div>
                    ) : (
                        ""
                    )} */}
                    {matchCart.map((item) => {
                        return (
                            <div className="cart-item">
                                <span className="cart-item-name">{item.title}</span>
                                <div className="flex">
                                    <a
                                        className="cart-item-remove fa fa-minus"
                                        onClick={() => remove(item.id)}
                                    ></a>
                                    <span className="cart-item-quantity">
                                        {matchCount[item.id]} ks
                                    </span>
                                    <a
                                        className="cart-item-remove fa fa-plus"
                                        onClick={() => add(item)}
                                    ></a>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="cart-bottom">
                    <div className="cart-summary">
                        <strong>Celkem:</strong>{" "}
                        <span className="cart-total">
                            {amount} {global.config.currency}
                        </span>
                    </div>
                    {cart?.length ? (
                        <div className="cart-buttons">
                            <a
                                href="#"
                                className="cart-checkout pay-cash"
                                onClick={() =>
                                    openModal({ name: "paymentMethodModal", step: "TIPS" })
                                }
                            >
                                Zaplatit
                            </a>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
            {modal?.name === "paymentMethodModal" ? <PaymentModal sendPayment={sendPayment} /> : ""}
            {modal?.name === "cleanCartModal" ? <CleanCartModal /> : ""}
            {/* {modal?.name === "paymentMethodModal"  ? <PaymentModal togglePaymenMethodModal={togglePaymenMethodModal} sendPayment={sendPayment} /> : ""}
            {isClearCartModal ? <CleanCardModal toggleCleanCartModal={toggleCleanCartModal} /> : ""} */}
        </>
    );
};

export default Cart;
