import React from 'react';
import {Link} from "react-router-dom";
const Home = () => {
    localStorage.setItem('userId', JSON.stringify("1"));
    return (
        <div>
            <h2 className="home-titulo">¡Ultimos estrenos!</h2>
            <div className="container">
                    <Link to={`/movies/`} className="box">
                    <img className="image-movies"/>
                </Link>

                <Link to={`/moviespurchased/`} className="box">
                    <img className="image-comprasmovie"/>
                </Link>
            </div>
        </div>
    );
};
export default Home;
