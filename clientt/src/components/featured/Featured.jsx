import React from 'react';
import "./featured.css";
import useFetch from '../../hooks/useFetch';
const Featured = () => {
    const {data, loading, error} = useFetch(
        "/hotels/countByCity?cities=berlin,ankara,antalya")
    return (
        <div className="featured">
            {loading ? ("Loading please wait...") : (<>
                <div className="featuredItem">
                    <img
                        className="featuredImg"
                        src="https://images.unsplash.com/photo-1600281677410-2b94fe5dfb93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80"
                        alt=""/>
                    <div className="featuredTitles">
                        <h1>Dublin</h1>
                        <h2>{data[0]} properties</h2>
                    </div>
                </div>
                <div className="featuredItem">
                    <img
                        className="featuredImg"
                        src="https://images.unsplash.com/photo-1600281677410-2b94fe5dfb93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80"
                        alt=""/>
                    <div className="featuredTitles">
                        <h1>Antalya</h1>
                        <h2>{data[1]} properties</h2>
                    </div>
                </div>
                <div className="featuredItem">
                    <img
                        className="featuredImg"
                        src="https://images.unsplash.com/photo-1600281677410-2b94fe5dfb93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80"
                        alt=""/>
                    <div className="featuredTitles">
                        <h1>Ankara</h1>
                        <h2>{data[2]} properties</h2>
                    </div>
                </div>
            </>)}
        </div>
    );
};

export default Featured;
