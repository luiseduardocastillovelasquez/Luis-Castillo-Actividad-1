import React, { useContext, useState, useEffect } from "react";
import { MovieContext } from "../context/MovieContext";
import LinearProgress from "./LinearProgress";
import {MoviePay} from "../components/MoviePay";
import useFetchMovies from "../hooks/useFetchMovies";

export const MovieListPurchased = () => {
    const { movies } = useContext(MovieContext);
    const [search, setSearch] = useState("");
    const [filteredMovies, setFilteredMovies] = useState([]);
    const { movieDetails, loading, error } = useFetchMovies();


    if (loading) {
        return <LinearProgress color="green" />;
    }

    if (error) {
        return <div>Error al cargar las películas: {error.message}</div>;
    }


    return (
        <div>
            <h2 className="center-text">Peliculas Disponibles</h2>
            <div className="movies-container">
                {movieDetails.length > 0 ? (
                    movieDetails.map((movie, index) => (
                        <MoviePay
                            key={index}
                            id={movie.id}
                            name={movie.name}
                            director={movie.director}
                            actores={movie.actors}
                            synopsis={movie.synopsis}
                            reviews={movie.reviews}
                        />
                    ))
                ) : (
                    <LinearProgress color="green" />
                )}
            </div>
        </div>
    );

};
