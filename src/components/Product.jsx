import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct } from "../reducers/cartReducer";

const Product = ({ item, index, button }) => {
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart.items.filter((cartItem) => cartItem.id === item.id));

    const add = (item) => {
        dispatch(addProduct(item));
    };

    const remove = (id) => {
        dispatch(removeProduct(id));
    };

    return (
        <li key={index} className={button ? 'button' : ''}>
            <a href="#" className="product-link has_image" onClick={() => add(item)}>
                {item.image_id && (
                    <img width="100px" src={`${global.config.protocol}://${global.config.apiHost}/static/${item.presta_id}/${item.image_id}.jpg`} />
                )}
                <span className="product-name">{item.title}</span>
            </a>
            <div className="product-bottom">
                {cart?.length ? (
                    <>
                        <a className="product-exclude" onClick={() => remove(item.id)}>
                            <span>-1</span>
                        </a>
                        <span>
                            {item.price} CZK<b>{cart.length} ks</b>
                        </span>
                        <a className="product-link" onClick={() => add(item)}>
                            <span className="product-add">+1</span>
                        </a>
                    </>
                ) : (
                    <span>{item.price} CZK</span>
                )}
            </div>
        </li>
    );
};

export default Product;
