import React, {useContext} from "react";
import { useParams} from "react-router-dom";
import {MovieContext} from "../context/MovieContext";
import LinearProgress from "./LinearProgress";
const VerMovie = () => {
    const {movieId} = useParams();
    const {movies} = useContext(MovieContext);
    const movie = movies.find(r => r.id === movieId);


    if (!movies){
        return <h2>Pelicula no encontrada</h2>;
    }

    return (

        movies.length > 0 ? (
        <div className="movie">
            <h2>{movie.name}</h2>
            <div className="trailer-container">
                <div dangerouslySetInnerHTML={{ __html: movie.trailler }} />
            </div>
        </div>
        ):(
            <LinearProgress color="green" />
        )
    );
}

export default VerMovie;