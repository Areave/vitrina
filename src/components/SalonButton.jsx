import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo_100czk from "../../public/img/logo_100czk.svg";
import bc_logo from "../../public/img/bc-logo.png";
import bca_logo from "../../public/img/bca-logo.svg";
import { resetDealer, setDealer } from "../reducers/dealersRedusers";
import '../../public/css/salonButton.css'

const SalonButton = ({dealer}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const settings = useSelector((state) => state.parameters);

    let {id, name, label, dealer_image_id} = dealer;

    let isBCA = settings.kiosk_name === '267 BCT Akademie - Praha - Karlovo namesti - Atrium';

    if (isBCA && id === 0) {
        label = 'BCT ACADEMIE'
    }

    const logos = {
        "co-working": bc_logo,
        'main': isBCA ? bca_logo : logo_100czk
    };

    const onButtonClick = () => {
        dispatch(setDealer(id));
        navigate('/terminal');
    };



    return <div className={'salon_button ' + name} onClick={onButtonClick}>
        <div className={"img_container " + name + `${isBCA ? ' square' : ''}`}>
            {/*<img src={`${ dealer_image_id ? 'https://api.100czk.cz/image?' + global.config.protocol + '://' + global.config.apiHost + + dealer_image_id : logos[name]}`} alt="terminals"/>*/}
            <img src={`${ dealer_image_id ? global.config.protocol + '://' + global.config.apiHost + '/image?sid=0&object_id=' + dealer_image_id : logos[name]}`} alt="terminals"/>
        </div>
        <div className={"label " + name}>
            {label || 'Terminal'}
        </div>
    </div>
};

export default SalonButton;