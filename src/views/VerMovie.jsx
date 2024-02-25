import React from "react";
import {useParams} from "react-router-dom";
import LinearProgress from "./LinearProgress";
import useFetchMovies from "../hooks/useFetchMovies";

const VerMovie = () => {
    const {movieId} = useParams();
    const {movieDetails, loading, error} = useFetchMovies(movieId, null);


    if (!movieDetails) {
        return <h2>Pelicula no encontrada</h2>;
    }

    return (
        loading ? (
            <LinearProgress color="green"/>
        ) : (
            <div className="movie">
                <h2>{movieDetails.name}</h2>
                <div className="trailer-container">
                    <div dangerouslySetInnerHTML={{__html: movieDetails.video}}/>
                </div>
            </div>
        )
    );
}

export default VerMovie;