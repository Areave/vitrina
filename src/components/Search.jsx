import React, {useRef} from "react";
import '../../public/css/search.css'

function Search({setFilterString, filterString}) {

    const onInputChange = (e) => {
        setFilterString(e.target.value)
    };

    const inputRef = useRef();

    return <div className='search'>
        <div className="search_container">
            <div className="title">SEARCH</div>
            <div className="input_container">
                <input type="text" ref={inputRef} onChange={onInputChange} value={filterString}/>
            </div>
            <div className="reset" onClick={() => {
                setFilterString('');
                inputRef.current.value = '';
            }}>
                <i className="fa fa-window-close-o fa-3x" aria-hidden="true"></i>
            </div>
        </div>
    </div>
}

export default Search;
