import React, {useContext, useState} from 'react';
import "./hotel.css";
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import MailList from '../../components/mailList/MailList';
import Footer from '../../components/footer/Footer';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleArrowLeft, faCircleArrowRight, faLocationDot, faCircleXmark} from '@fortawesome/free-solid-svg-icons';
import useFetch from '../../hooks/useFetch';
import {useLocation, useNavigate} from 'react-router-dom';
import {SearchContext} from '../../context/SearchContext';
import {AuthContext} from '../../context/AuthContext';
import Reserve from '../../components/reserve/Reserve';

const Hotel = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [sliderNumber, setSliderNumber] = useState(0);
    const [open, setOpen] = useState(false);
    const [openModel, setOpenModel] = useState(false);

    const {data, error, loading} = useFetch(`/hotels/find/${id}`)
    const {dates, options} = useContext(SearchContext);
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    const MILLISECONDS_PER_DAY =1000 * 60 * 60 * 24;
    function dayDifference(date1, date2) {
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
        return diffDays;
    }

    const days = dayDifference(dates[0].endDate, dates[0].startDate);
    const handleOpen = (i) => {
        setSliderNumber(i);
        setOpen(true);
    }
    const handleMove = (direction) => {
        let newSliderNumber ;
        if(direction === "l"){
            newSliderNumber = sliderNumber === 0 ? 5 : sliderNumber-1;
        }else {
            newSliderNumber = sliderNumber === 5 ? 0 : sliderNumber+1;
        }
        setSliderNumber(newSliderNumber);
    }
    const handleClick = () => {
        if(user) {
            setOpenModel(true);
        }else {
            navigate("/login");
        }
    }
    return (
        <div>
            <Navbar/>
            <Header type="list"/>
            {loading ? ("Loading...") : (
                <div className="hotelContainer">
                    {open && <div className="slider">
                        <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={() => setOpen(!open)}/>
                        <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={() => handleMove('l')}/>
                        <div className="sliderWrapper">
                            <img className="sliderImg" src={data?.photos[sliderNumber]} alt=""/>
                        </div>
                        <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={() => handleMove('r')}/>
                    </div>}
                    <div className="hotelWrapper">
                        <button className="bookNow">Reserve or book now!</button>
                        <h1 className="hotelTitle">{data.name}</h1>
                        <div className="hotelAddress">
                            <FontAwesomeIcon icon={faLocationDot}/>
                            <span>{data.address}</span>
                        </div>
                        <span className="hotelDistance">
                        Excellent location - {data.distance}m from center
                    </span>
                        <span className="hotelPriceHighlight">
                        Book s stay over ${data.cheapestPrice} at this property and get a free airport taxi
                    </span>
                        <div className="hotelImages">
                            {data.photos?.map((photo, i) => (
                                <div className="hotelImgWrapper" key={i}>
                                    <img onClick={() => handleOpen(i)} className="hotelImg" key={i} src={photo} alt=""/>
                                </div>
                            ))}
                        </div>
                        <div className="hotelDetails">
                            <div className="hotelDetailsTexts">
                                <h1 className="hotelTitle">{data.title}</h1>
                                <p className="hotelDesc">
                                    {data.desc}
                                </p>
                            </div>
                            <div className="hotelDetailsPrice">
                                <h1>Perfect for a {days}-night stay!</h1>
                                <span>You're eligible for a Genius discount at Hostal Evoke Madrid! To save at this property</span>
                                <h2><b>${days * data.cheapestPrice * options.room}</b> ({days} nights)</h2>
                                <button onClick={handleClick}>Reserve or book now!</button>
                            </div>
                        </div>
                    </div>
                    <MailList/>
                    <Footer/>
                </div>
            )}
            {openModel && <Reserve setOpen={setOpenModel} hotelId={id}/>}
        </div>
    );
};

export default Hotel;
