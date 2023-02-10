import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker, { registerLocale } from "react-datepicker";
import { setDate } from "../../reducers/cartReducer";
import es from 'date-fns/locale/cs';
registerLocale('cs', es)

function ChangeDate({ toggleChangeDateModal }) {
    const dispatch = useDispatch();
    const date = useSelector((state) => state.cart.date);
    const [chooseDate, setChooseDate] = useState(date ? new Date(date) : new Date());

    const prepareDatePicker = (date) => {
        date = new Date(date).toISOString().slice(0, 10)
        return date
    }

    const changeDate = (date) => {
        date = prepareDatePicker(date) !== prepareDatePicker(new Date()) ? prepareDatePicker(date) : null;
        setChooseDate(date);
        dispatch(setDate(date));
        toggleChangeDateModal();
    };

    return (
        <>
            <div id="datepicker" className="hasDatePicker">
                <DatePicker
                    className="ui-datepicker-inline ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"
                    selected={chooseDate}
                    onChange={date => changeDate(date)}
                    inline
                    locale="cs"
                />
            </div>
        </>
    );
}

export default ChangeDate;
