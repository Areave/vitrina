import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link, BrowserRouter } from "react-router-dom";
import { emptyDate } from "../reducers/cartReducer";
import { setCollaborator } from "../reducers/collaboratorsRedusers";
import { getCollaborators } from "./actions/collaborators";
import Loader from "./Loader";
import Header from "./Header";
import LoadingDataError from "./LoadingDataError";
// import { getCollaborators } from './actions/collaborators';

function Terminal() {
    const url = useLocation();

    // const collaborators = props.collaborators

    const dispatch = useDispatch();
    const currentDealer = useSelector((state) => state.dealers.item);
    const [isFetching, setIsFetching] = useState(false);
    const collaborators = useSelector((state) => state.collabarators.items[currentDealer.name]);
    const collaboratorsError = useSelector((state) => state.collabarators.isError);

    useEffect(()=>{
        if (!collaborators) {
            setIsFetching(true);
            dispatch(getCollaborators(currentDealer));
        }
    }, []);


    useEffect(() => {
        if (collaborators?.length || collaboratorsError) {
            setIsFetching(false);
        }
    }, [collaborators]);

    const onClickSetCollaborator = (id) => {
        dispatch(setCollaborator(id, collaborators));
        dispatch(emptyDate());
    };

	/* 
	Scroll
	 */
    const [parentHeight, setParentHeight] = useState(parentHeight);
    const [childHeight, setChildHeight] = useState(childHeight);
    const [offsetTop, setOffsetTop] = useState(offsetTop);
    const [sliderHeight, setSliderHeight] = useState(sliderHeight);

    useEffect(() => {
        document.getElementById("employees") && setParentHeight(document.getElementById("employees").clientHeight);
        document.getElementById("employeesul") && setChildHeight(document.getElementById("employeesul").clientHeight);
        document.getElementById("employeesul") && setOffsetTop(document.getElementById("employeesul").scrollTop);
        setSliderHeight(parentHeight / (childHeight / parentHeight));
    }, [parentHeight, childHeight]);

    useEffect(() => {
        let el;
        let handleScroll;
        if (document.getElementById("employees")) {
            el = document.getElementById("employees");
            handleScroll = (e) => {
                setOffsetTop(el.scrollTop);
            };
            el.addEventListener("scroll", handleScroll);
        }
        if (el) {
            return () => el.removeEventListener("scroll", handleScroll);
        }
    });

    // useEffect(() => {
    //     if (isCollaboratorsError) {
    //         setIsFetching(false);
    //     }
    // }, [isCollaboratorsError]);

    const setScroolUp = () => {
        if (offsetTop <= 0) return;
        const y = offsetTop - 100;
        if (sliderHeight) setOffsetTop(y);
        document.getElementById("employees").scrollTop = y;
    };

    const setScroolDown = () => {
		if (offsetTop >=  childHeight - parentHeight) return;
        const y = offsetTop + 100;
        setOffsetTop(y);
        document.getElementById("employees").scrollTop = y;
    };

    if (collaboratorsError) {
        return <LoadingDataError />;
    }

    if (isFetching) {
        return <Loader/>;
    }

    return (
        <>
            <div id="employees" className="unvisibled big-content" style={{ opacity: 1 }}>
                <ul id="employeesul" className="tiles">
                    {Array.isArray(collaborators) && collaborators.length
                        ? collaborators.map((item, index) => {
                              return (
                                  <li key={index}>
                                      <a onClick={() => onClickSetCollaborator(item.id)}>
                                          <span>{item.name}</span>
                                      </a>
                                  </li>
                              );
                          })
                        : ""}
                </ul>

                <div className="scrolling" scroll-targ="left-content" style={{}}>
                    <div
                        className="simulate-bar"
                        style={{
                            height: sliderHeight + "px",
                            marginTop: offsetTop / (childHeight / parentHeight) + "px",
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

export default Terminal;
