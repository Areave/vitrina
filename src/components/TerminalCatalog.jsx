import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBreadcrumb, setCatalog, sliceBreadcrumb } from "../reducers/catalogReducer";
import Product from "./Product";
import Search from "./Search";
import { getCatalog } from "./actions/catalog";
import Loader from "./Loader";

function TerminalCatalog() {
    const dispatch = useDispatch();

    const currentDealer = useSelector((state) => state.dealers.item);
    let catalog = useSelector((state) => state.catalog.items[currentDealer.name]);
    const breadcrumb = useSelector((state) => state.catalog.breadcrumb);

    // breadcrumb.forEach((item) => {
    //     catalog = catalog.categories.find((cat) => cat.id === item.id);
    // });

    const [filterString, setFilterString] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [localCatalog, setLocalCatalog] = useState(null);
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
        if (catalog && catalog.products) {
            if (isFetching) {
                setIsFetching(false);
            }
            setLocalCatalog(catalog);
        }
    }, [catalog]);


    useEffect(() => {
        if (localCatalog && localCatalog.products) {
            setFilteredProducts(localCatalog.products);
        }
    }, [localCatalog]);

    useEffect(() => {
        setFilterString("");
        if (breadcrumb.length) {
            let newCatalog = catalog;
            breadcrumb.forEach((item) => {
                newCatalog = newCatalog.categories.find((cat) => {
                    return cat.id === item.id;
                });
            });
            if (newCatalog) {
                setLocalCatalog(newCatalog);
            }
        } else setLocalCatalog(catalog);
    }, [breadcrumb]);


    useEffect(() => {
        if (catalog && localCatalog) {
            if (filterString) {
                let products = getFilteredProducts(filterString, localCatalog.products);
                setFilteredProducts(products);
            } else {
                setFilteredProducts(localCatalog.products);
            }
        }
    }, [filterString]);


    useEffect(() => {
        setParentHeight(document.getElementById("left-content")?.clientHeight);
        setChildHeight(document.getElementById("categories")?.clientHeight + document.getElementById("products")?.clientHeight);
        setOffsetTop(document.getElementById("left-content")?.scrollTop);
        setSliderHeight(parentHeight / (childHeight / parentHeight));
    }, [parentHeight, childHeight, breadcrumb, localCatalog]);


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

        let searchArray = [filterString];

        const filterStringArray = filterString.split("");
        for (let index = 0; index < filterStringArray.length; index++) {
            if (diacritData[filterStringArray[index]]) {
                const diacritVars = diacritData[filterStringArray[index]];
                // console.log("diacritVars", diacritVars);
                const newAr = [];
                searchArray.forEach((searchWord) => {
                    // console.log("searchWord", searchWord);
                    const searchWordArray = searchWord.split("");
                    diacritVars.forEach((variant) => {
                        let varWord;
                        if (index === 0) {
                            varWord = [variant, ...searchWordArray.slice(1)].join("");
                        } else {
                            varWord = [...searchWordArray.slice(0, index), variant, ...searchWordArray.slice(index + 1)].join("");
                        }
                        // console.log("varWord", varWord);
                        newAr.push(varWord);
                    });
                });
                searchArray = [...searchArray, ...newAr];
            }
        }
        // console.log("searchArray", searchArray);
        // return [filterString];
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
                        {localCatalog?.categories?.map((item, index) => {
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
                    <Search setFilterString={setFilterString} filterString={filterString}/>
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
