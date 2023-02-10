import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { emptyDate } from "../reducers/cartReducer";
import { setCollaborator } from "../reducers/collaboratorsRedusers";
// import { getCollaborators } from './actions/collaborators';

function Terminal(props) {
    const url = useLocation();

    // const collaborators = props.collaborators

    const dispatch = useDispatch();

    // useEffect(()=>{
    // 	dispatch(getCollaborators())
    // }, [])

    const collaborators = useSelector((state) => state.collabarators.items);

    const onClickSetCollaborator = (id) => {
        dispatch(setCollaborator(id));
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
        setParentHeight(document.getElementById("employees").clientHeight);
        setChildHeight(document.getElementById("employeesul").clientHeight);
        setOffsetTop(document.getElementById("employeesul").scrollTop);
        setSliderHeight(parentHeight / (childHeight / parentHeight));
    }, [parentHeight, childHeight]);

    useEffect(() => {
        const el = document.getElementById("employees");
        const handleScroll = (e) => {
            setOffsetTop(el.scrollTop);
        };
        el.addEventListener("scroll", handleScroll);
        return () => el.removeEventListener("scroll", handleScroll);
    });

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
