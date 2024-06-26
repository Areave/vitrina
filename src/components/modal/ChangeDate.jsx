import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDate } from "../../reducers/cartReducer";
import { useEffect } from "react";
// import DatePicker, { registerLocale } from "react-datepicker";
// import es from "date-fns/locale/cs";
// registerLocale("cs", es);

function ChangeDate({ toggleChangeDateModal }) {
    const dispatch = useDispatch();
    const date = useSelector((state) => state.cart.date);
    const [chooseDate, setChooseDate] = useState(date ? new Date(date) : new Date());

    const prepareDatePicker = (date) => {
        date = new Date(date).toISOString().slice(0, 10);
        return date;
    };

    const changeDate = (date) => {
        date = prepareDatePicker(date) !== prepareDatePicker(new Date()) ? prepareDatePicker(date) : null;
        setChooseDate(date);
        dispatch(setDate(date));
        toggleChangeDateModal();
    };

    useEffect(() => {
        $(function () {
            $("#datepicker").datepicker({
                onSelect: function () {
                    changeDate($.datepicker.formatDate("yy-mm-dd", $(this).datepicker('getDate')))
                },
                yearRange: "2010:20230",
                defaultDate: date ? new Date(date) : undefined
            });
        });
    });

    return (
        <>
            <div id="datepicker"></div>
        </>
    );
}

export default ChangeDate;
