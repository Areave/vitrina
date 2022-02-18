import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBreadcrumb, sliceBreadcrumb } from "../reducers/catalogReducer";
import Product from "./Product";

function TerminalCatalog() {
    const dispatch = useDispatch();

    let catalog = useSelector((state) => state.catalog.items);
    const breadcrumb = useSelector((state) => state.catalog.breadcrumb);

    breadcrumb.forEach((item) => {
        catalog = catalog.categories.find((cat) => cat.id === item.id);
    });

    const chooseCategory = (item) => {
        dispatch(addBreadcrumb(item));
    };

    const returnCategory = (num) => {
        dispatch(sliceBreadcrumb(num));
    };

    useEffect(() => {
		let UPC = '';
		document.addEventListener("keydown", function(e) {
			const textInput = e.key || String.fromCharCode(e.keyCode);
			const targetName = e.target.localName;
			let newUPC = '';
			if (textInput && textInput.length === 1 && targetName !== 'input'){
				newUPC = UPC+textInput;
	
			  if (newUPC.length >= 6) {
				console.log('barcode scanned:  ', newUPC);
			  } 
		   }
		});
    }, []);

    return (
        <>

            <div id="left-content" className="">
                <div id="categories" className="unvisibled" style={{ opacity: 1 }}>
                    {breadcrumb.length ? (
                        <div className="breadcrumb" style={{ width: "100%" }}>
                            <a className="breadcrumb-item breadcrumb-home" onClick={() => returnCategory(-1)}>
                                DOMŮ
                            </a>
                            {breadcrumb.map((item, index, arr) => {
                                return index === arr.length - 1 ? (
                                    <span className="breadcrumb-item">{item.title}</span>
                                ) : (
                                    <a className="breadcrumb-item" onClick={() => returnCategory(index)}>
                                        {item.title}
                                    </a>
                                );
                            })}
                        </div>
                    ) : (
                        <></>
                    )}
                    <ul className="tiles">
                        {catalog?.categories?.map((item, index) => {
                            return (
                                <li key={index}>
                                    <a href="#" className="category-link" onClick={() => chooseCategory({ id: item.id, title: item.title })}>
                                        <span>{item.title}</span>
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                    <ul className="tiles"></ul>
                    <ul className="tiles"></ul>
                </div>

                <div className="scrolling" scroll-targ="left-content" style={{ height: "752.391px", top: "83.5938px", left: "1373.12px" }}>
                    <div className="simulate-bar" style={{ height: "236.634px", marginTop: "66.875px", marginBottom: "66.875px", top: "0px" }}></div>
                    <div className="fa fa-chevron-circle-up"></div>
                    <div className="fa fa-chevron-circle-down"></div>
                </div>

                <div id="products" className="">
                    <ul>
                        {catalog?.products?.map((item, index) => {
                            return <Product item={item} index={index} />;
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default TerminalCatalog;
