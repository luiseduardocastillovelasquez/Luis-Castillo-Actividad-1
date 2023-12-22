import React from 'react';
import useRedirection from "../hooks/useRedirectio";

function Landing() {

    useRedirection("/movies", 2050);

    return (
        <div className="landing">
                <h1>Cargando Peliculas....</h1>
            <span className="laser-pointer"></span>
            <span className="laser-pointer-reverse"></span>
        </div>
    );
}

export default Landing;
