import React, { useEffect, useState } from "react";

import {Link} from "react-router-dom";

import {Movie} from "../components/Movie";

import LinearProgress from "./LinearProgress";

import UseSearch from "../hooks/useSearch";
import useFetchMovies from "../hooks/useFetchMovies";

export const MoviesList = () => {
    const [search, setSearch] = useState("");
    const [filteredMovies, setFilteredMovies] = useState([]);
    const {movieDetails, loading, error} = useFetchMovies();
    const {aggregateMovieDetails, aggregateLoading, aggregateError} = useFetchMovies(null, 'aggregate');


    useEffect(() => {
        // Cuando movieDetails cambie, actualiza los filteredMovies
        setFilteredMovies(movieDetails);
    }, [movieDetails]);

    const handleSearch = (value) => {
        setSearch(value);

        const filteredResults = movieDetails.filter((dato) =>
            Object.values(dato).some((field) =>
                typeof field === 'string' && field.toLowerCase().includes(value.toLowerCase())
            )
        );
        console.log("Filtered Movies:", filteredResults);

        setFilteredMovies(filteredResults);
    };

    return (
        <div>
            <h2 className="center-text">Peliculas Disponibles</h2>

            <h3 className="additional-details-title">Detalles Adicionales:</h3>

            <div className="additional-details-container">
                {aggregateMovieDetails && aggregateMovieDetails.length > 0 && (
                    <div className="additional-details-list">
                        {aggregateMovieDetails.map((detail, index) => (
                            <div key={index} className="additional-details-item">
                                <Link to={`/movies/category/${detail.name}`}>
                                    <p className="detail-name">{detail.name}:</p>
                                    <span className="detail-count">{detail.count}</span>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <UseSearch onSearch={handleSearch}/>
            <div className="movies-container">
                {loading ? (
                    <LinearProgress color="green"/>
                ) : (
                    filteredMovies.map((movie, index) => (
                        <Movie
                            key={index}
                            id={movie.id}
                            name={movie.name}
                            director={movie.director}
                            year={movie.year}
                            duration={movie.duration}
                            synopsis={movie.synopsis}
                            reviews={movie.reviews}
                            imagen={movie.image}
                            idiomas={movie.language}
                            actores={movie.actores}
                            categorias={movie.categorias}
                        />
                    ))
                )}
            </div>
        </div>
    );
};
