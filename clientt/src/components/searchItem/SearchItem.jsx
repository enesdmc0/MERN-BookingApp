import React from 'react';
import "./searchItem.css";
import {Link} from 'react-router-dom';
const SearchItem = ({item}) => {
    return (
        <div className="searchItem">
            <img src={item.photos[0]} alt="" className="siImg"/>
            <div className="siDesc">
                <h1 className="siTitle">{item.name}</h1>
                <span className="siDistance">500m from center</span>
                <span className="siTaxiOp">Free airport Taxi</span>
                <span className="siSubtitle">Studio apartment with ait conditioning</span>
                <span className="siFeatures">{item.desc}</span>
                <span className="siCancelOp">Free cancellation</span>
                <span className="siCancelOpSubtitle">You can cancel later, so lock in this great price today!</span>
            </div>
            <div className="siDetails">
                {item.rating && <div className="siRating">
                    <span>Excellent</span>
                    <button>{item.rating}</button>
                </div>}
                <div className="siDetailTexts">
                    <span className="siPrice">${item.cheapestPrice}</span>
                    <span className="siTaxOp">Includes taxes and frees</span>
                    <Link to={`/hotels/${item._id}`}>
                        <button className="siCheckButton">See available</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SearchItem;
