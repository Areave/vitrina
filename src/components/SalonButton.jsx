import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo_100czk from "../../public/img/logo_100czk.svg";
import bc_logo from "../../public/img/bc-logo.png";
import { resetDealer, setDealer } from "../reducers/dealersRedusers";
import '../../public/css/salonButton.css'

const SalonButton = ({dealer}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    let {id, name, label} = dealer;

    if (id === 0) {
        name = 'main';
    } else {
        name = 'co-working';
    }

    const labels = {
        'co-working': 'Beauty Coworking Time',
        'main': 'Terminál'
    };
    const logos = {
        "co-working": bc_logo,
        'main': logo_100czk
    };

    const onButtonClick = () => {
        dispatch(setDealer(id));
        navigate('/terminal');
    };



    return <div className={'salon_button ' + name} onClick={onButtonClick}>
        <div className={"img_container " + name}>
            <img src={logos[name] || logo_100czk} alt="terminals"/>
        </div>
        <div className={"label " + name}>
            {label || 'Terminal'}
        </div>
    </div>
};

export default SalonButton;