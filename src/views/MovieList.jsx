import React, { useContext, useEffect, useState } from "react";
import { Movie } from "../components/Movie";
import { MovieContext } from "../context/MovieContext";
import LinearProgress from "./LinearProgress";
import UseSearch from "../hooks/useSearch";
import useFetchMovies from "../hooks/useFetchMovies";

export const MoviesList = () => {
    const [search, setSearch] = useState("");
    const { movieDetails, loading, error } = useFetchMovies();
    const [filteredMovies, setFilteredMovies] = useState([]);


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
            <UseSearch onSearch={handleSearch} />
            <div className="movies-container">
                {loading ? (
                    <LinearProgress color="green" />
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
