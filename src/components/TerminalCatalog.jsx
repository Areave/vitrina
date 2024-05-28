import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBreadcrumb, sliceBreadcrumb } from "../reducers/catalogReducer";
import Product from "./Product";
import Search from "./Search";
import { getCatalog } from "./actions/catalog";
import Loader from "./Loader";

function TerminalCatalog() {
    const dispatch = useDispatch();

    const currentDealer = useSelector((state) => state.dealers.item);
    let catalog = useSelector((state) => state.catalog.items[currentDealer.name]);
    const breadcrumb = useSelector((state) => state.catalog.breadcrumb);

    breadcrumb.forEach((item) => {
        catalog = catalog.categories.find((cat) => cat.id === item.id);
    });

    const [filterString, setFilterString] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    // console.log("breadcrumb", breadcrumb);

    /*
Scroll
 */
    const [parentHeight, setParentHeight] = useState(0);
    const [childHeight, setChildHeight] = useState(0);
    const [offsetTop, setOffsetTop] = useState(0);
    const [sliderHeight, setSliderHeight] = useState(0);

    useEffect(() => {
        let UPC = "";
        document.addEventListener("keydown", function(e) {
            const textInput = e.key || String.fromCharCode(e.keyCode);
            const targetName = e.target.localName;
            let newUPC = "";
            if (textInput && textInput.length === 1 && targetName !== "input") {
                newUPC = UPC + textInput;

                if (newUPC.length >= 6) {
                    // console.log("barcode scanned:  ", newUPC);
                }
            }
        });
    }, []);

    useEffect(() => {
        const el = document.getElementById("left-content");
        const handleScroll = (e) => {
            setOffsetTop(el.scrollTop);
        };
        el?.addEventListener("scroll", handleScroll);
        return () => el?.removeEventListener("scroll", handleScroll);
    });

    useEffect(() => {
        if (!catalog) {
            setIsFetching(true);
            dispatch(getCatalog(currentDealer));
        }
    }, []);

    useEffect(() => {
        if (catalog && catalog.products && isFetching) {
            setIsFetching(false);
            setFilteredProducts(catalog.products)
        }
    }, [catalog]);


    useEffect(() => {
        if (catalog) {
            let products = getFilteredProducts(filterString, catalog.products);
            setFilteredProducts(products)
        }
    }, [filterString]);


    useEffect(() => {
        setFilterString("");
    }, [breadcrumb]);

    useEffect(() => {
        setParentHeight(document.getElementById("left-content")?.clientHeight);
        setChildHeight(document.getElementById("categories")?.clientHeight + document.getElementById("products")?.clientHeight);
        setOffsetTop(document.getElementById("left-content")?.scrollTop);
        setSliderHeight(parentHeight / (childHeight / parentHeight));
    }, [parentHeight, childHeight, breadcrumb]);


    const setScroolUp = () => {
        if (offsetTop <= 0) return;
        const y = offsetTop - 100;
        if (sliderHeight) setOffsetTop(y);
        document.getElementById("left-content").scrollTop = y;
    };

    const setScroolDown = () => {
        if (offsetTop >= childHeight - parentHeight) return;
        const y = offsetTop + 100;
        setOffsetTop(y);
        document.getElementById("left-content").scrollTop = y;
    };


    const chooseCategory = (item) => {
        dispatch(addBreadcrumb(item));
    };

    const returnCategory = (num) => {
        dispatch(sliceBreadcrumb(num));
    };

    const createSearchArray = (filterString) => {
        const diacritData = {
            "e": ["ě", "é"],
            "i": ["í"],
            "c": ["č"],
            "s": ["š"],
            "r": ["ř"],
            "y": ["ý"],
            "z": ["ž"],
            "a": ["á"],
            "u": ["ů", "ú"],
            "o": ["ó"],
            "t": ["ť"],
            "d": ["ď"],
            "n": ["ň"]
        };

        const searchArray = [filterString];

        const filterStringArray = filterString.split('');
        for (let i = 0; i < filterStringArray.length; i++) {

        }

        return searchArray;
    };

    const getFilteredProducts = (filterString, initProducts) => {
        if (!initProducts || !initProducts.length) return [];
        if (!filterString) return initProducts;
        const searchArray = createSearchArray(filterString);
        const products = [...initProducts];
        const filteredProducts = [];
        for (let product of products) {
            for (let searchStringVariant of searchArray) {
                if (product.title.toLowerCase().includes(searchStringVariant.toLowerCase())) {
                    filteredProducts.push(product);
                }
            }
        }
        return filteredProducts;
        // return products.filter(product => product.title.includes(filterString));
    };


    if (isFetching) {
        return <Loader/>;
    }

    return (
        <>
            <div id="left-content" className="big-content">
                <div id="categories" className={"unvisibled " + `${currentDealer ? currentDealer.name : ""}`} style={{ opacity: 1 }}>
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
                    <ul className={"tiles " + `${currentDealer ? currentDealer.name : ""}`}>
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
                    {/*<ul className={'tiles' + `${button ? ' button' : ''}`}></ul>*/}
                    {/*<ul className={'tiles' + `${button ? ' button' : ''}`}></ul>*/}
                </div>

                <div id="products" className={currentDealer ? currentDealer.name : ""}>
                    <Search setFilterString={setFilterString}/>
                    <ul>
                        {filteredProducts && filteredProducts.filter(item => item.type !== "GOODS_SERVICE_FEE").map((item, index) => {
                            return <Product item={item} index={index}/>;
                        })}
                    </ul>
                </div>

                <div className="scrolling" scroll-targ="left-content" style={{}}>
                    <div
                        className="simulate-bar"
                        style={{
                            height: sliderHeight + "px",
                            marginTop: offsetTop / (childHeight / parentHeight) + "px"
                        }}
                    ></div>
                    <div className="fa fa-chevron-circle-up" onClick={() => setScroolUp()}></div>
                    <div
                        className="fa fa-chevron-circle-down"
                        onClick={() => setScroolDown()}
                    ></div>
                </div>

            </div>
        </>
    );
}

export default TerminalCatalog;
