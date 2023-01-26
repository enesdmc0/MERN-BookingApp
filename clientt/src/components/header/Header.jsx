import React, {useContext, useState} from 'react';
import "./header.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBed, faCar, faPlane, faTaxi, faCalendarDays, faPerson} from '@fortawesome/free-solid-svg-icons';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format} from 'date-fns';
import {useNavigate} from 'react-router-dom';
import {SearchContext} from '../../context/SearchContext';
import {AuthContext} from '../../context/AuthContext';
const Header = ({type}) => {
    const [openDate, setOpenDate] = useState(false);
    const [destination, setDestination] = useState("");
    const {user} = useContext(AuthContext);
    const [dates, setDates] = useState([
        {
            startDate : new Date(),
            endDate : new Date(),
            key : "selection"
        }
    ])
    const [openOptions, setOpenOptions]  = useState(false);
    const [options, setOptions] = useState({
        adult : 1,
        children : 0,
        room : 1,
    })

    const navigate = useNavigate();
    const handleOption = (name, operation) => {
        setOptions(prev => {
            return {
                ...prev,
                [name] : operation === "i" ? options[name] + 1 : options[name] - 1
            }
        })
    }
    const {dispatch} = useContext(SearchContext)

    const handleSearch = () => {
        dispatch({type:"NEW_SEARCH", payload: {destination, dates, options}})
        navigate("/hotels", {state : {destination, dates, options}});
    };
    return (
        <div className="header">
            <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
            <div className="headerList">
                <div className="headerListItem active">
                    <FontAwesomeIcon icon={faBed}/>
                    <span>Stays</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faPlane}/>
                    <span>Flights</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faCar}/>
                    <span>Car rentals</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faBed}/>
                    <span>Attractions</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faTaxi}/>
                    <span>Airport taxis</span>
                </div>
            </div>
                {type !== "list" &&
                    <>
                        <h1 className="headerTitle">
                            A lifetime of discounts? It' Genius.
                        </h1>
                        <p className="headerDesc">
                            Get rewarded for your travels - unlock instant savings of 10% or more with a free Dmcbooking account.
                        </p>
                        {user && <button className="navButton">Logout</button>}
                        <div className="headerSearch">
                            <div className="headerSearchItem">
                                <FontAwesomeIcon className="headerIcon" icon={faBed}/>
                                <input onChange={(e) => setDestination(e.target.value)} type="text" className="headerSearchInput" placeholder="Where are you giong?"/>
                            </div>
                            <div className="headerSearchItem">
                                <FontAwesomeIcon className="headerIcon" icon={faCalendarDays}/>
                                <span className="headerSearchText" onClick={() => setOpenDate(!openDate)}>
                            {`${format(dates[0].startDate, "MM/dd/yyyy")}
                             to
                            ${format(dates[0].endDate, "MM/dd/yyyy")}`}
                        </span>
                                {openDate && <DateRange
                                    editableDateInputs={true}
                                    onChange={(item) => setDates([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    ranges={dates}
                                    className="date"
                                    minDate={new Date()}/>

                                }
                            </div>
                            <div className="headerSearchItem">
                                <FontAwesomeIcon className="headerIcon" icon={faPerson}/>
                                <span onClick={() => setOpenOptions(!openOptions)} className="headerSearchText">{`${options.adult} adult | ${options.children} children | ${options.room} room`}</span>
                                {openOptions && <div className="options" >
                                    <div className="optionsItem">
                                        <span className="optionText">Adult</span>
                                        <div className="optionCounter">
                                            <button disabled={options.adult <= 1} className="optionCounterButton"
                                                    onClick={() => handleOption('adult', 'd')}>-
                                            </button>
                                            <span className="optionsCounterNumber">{options.adult}</span>
                                            <button className="optionCounterButton"
                                                    onClick={() => handleOption('adult', 'i')}>+
                                            </button>
                                        </div>
                                    </div>
                                    <div className="optionsItem">
                                        <span className="optionText">Children</span>
                                        <div className="optionCounter">
                                            <button disabled={options.children <= 0} className="optionCounterButton"
                                                    onClick={() => handleOption('children', 'd')}>-
                                            </button>
                                            <span className="optionsCounterNumber">{options.children}</span>
                                            <button className="optionCounterButton"
                                                    onClick={() => handleOption('children', 'i')}>+
                                            </button>
                                        </div>
                                    </div>
                                    <div className="optionsItem">
                                        <span className="optionText">Room</span>
                                        <div className="optionCounter">
                                            <button disabled={options.room <= 1} className="optionCounterButton"
                                                    onClick={() => handleOption('room', 'd')}>-
                                            </button>
                                            <span className="optionsCounterNumber">{options.room}</span>
                                            <button className="optionCounterButton"
                                                    onClick={() => handleOption('room', 'i')}>+
                                            </button>
                                        </div>
                                    </div>
                                </div>}
                            </div>
                            <div className="headerSearchItem">
                                <button onClick={handleSearch} className="headerSearchBtn">Search</button>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    );
};

export default Header;
