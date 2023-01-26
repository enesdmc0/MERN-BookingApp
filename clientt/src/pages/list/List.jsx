import React, {useState} from 'react';
import "./list.css";
import SearchItem from '../../components/searchItem/SearchItem';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import {useLocation} from 'react-router-dom';
import {format} from 'date-fns';
import {DateRange} from 'react-date-range';
import useFetch from '../../hooks/useFetch';

const List = () => {
    const location = useLocation();
    const [destination, setDestination] = useState(location.state.destination);
    const [dates, setDates] = useState(location.state.dates);
    const [options, setOptions] = useState(location.state.options);
    const [openDate, setOpenDate] = useState(false);
    const [min, setMin] = useState(undefined);
    const [max, setMax] = useState(undefined);
    const {data, loading, error, reFetch} = useFetch(`/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`);

    const handleClick = () => {
        reFetch();
    }
    return (
        <div>
            <Navbar/>
            <Header type="list"/>
            <div className="listContainer">
                <div className="listWrapper">
                    <div className="listSearch">
                        <h1 className="lsTitle">Search</h1>
                        <div className="lsItem">
                            <label>Destination</label>
                            <input placeholder={destination} type="text"/>
                        </div>
                        <div className="lsItem">
                            <label>Check-in Date</label>
                            <span onClick={() => setOpenDate(!openDate)}>{`${format(dates[0].startDate, "MM/dd/yyyy")}
                             to
                            ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
                            {openDate && <DateRange
                                onChange={(item) => setDates([item.selection])}
                                minDate={new Date()}
                                ranges={dates}/>}
                        </div>
                        <div className="lsItem">
                            <label>Options</label>
                            <div className="lsOptions">
                            <div className="lsOptionsItem">
                                <span className="lsOptionText">
                                    Min price <small>per night</small>
                                </span>
                                <input onChange={(e) => setMin(e.target.value)} type="number" className="lsOptionInput"/>
                            </div>
                            <div className="lsOptionsItem">
                                <span className="lsOptionText">
                                    Max price <small>per night</small>
                                </span>
                                <input onChange={(e) => setMax(e.target.value) } type="number" className="lsOptionInput"/>
                            </div>
                            <div className="lsOptionsItem">
                                <span className="lsOptionText">
                                    Adult
                                </span>
                                <input min={1} type="number" className="lsOptionInput" placeholder={options.adult}/>
                            </div>
                            <div className="lsOptionsItem">
                                <span className="lsOptionText">
                                    Children
                                </span>
                                <input min={0} type="number" className="lsOptionInput" placeholder={options.children}/>
                            </div>
                            <div className="lsOptionsItem">
                                <span className="lsOptionText">
                                    Room
                                </span>
                                <input min={1} type="number" className="lsOptionInput" placeholder={options.room}/>
                            </div>
                            </div>
                        </div>
                        <button onClick={handleClick}>Search</button>
                    </div>
                    <div className="listResult">
                        {loading ? ("Loading...") : (<>
                            {data.map(item => (
                                <SearchItem key={item._id} item={item}/>
                            ))}
                        </>)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default List;
