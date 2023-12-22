import React, { useContext, useState, useEffect } from "react";
import { MovieContext } from "../context/MovieContext";
import LinearProgress from "./LinearProgress";
import {MoviePay} from "../components/MoviePay";

export const MovieListPurchased = () => {
    const { movies } = useContext(MovieContext);
    const [search, setSearch] = useState("");
    const [filteredMovies, setFilteredMovies] = useState([]);


    useEffect(() => {

        // Actualizar el estado de alquiler y comprada basado en localStorage
        const updateMovieState = (movie) => {
            console.log("mach",movie);
            const matchingMovieData = JSON.parse(localStorage.getItem(`movie_${movie.id}`)) ||
                {};

            return {
                ...movie,
                alquiler: matchingMovieData.alquiler === true,
                comprada: matchingMovieData.comprada === true || movie.comprada === "true",
            };
        };

        // Aplicar la actualización a cada película
        const updatedMovies = movies.map(updateMovieState);

        // Filtrar películas basadas en condiciones y localStorage
        const filteredResults = updatedMovies.filter(
            (movie) =>
                ((movie.alquiler === true || movie.comprada === true) &&
                    Object.values(movie).some((field) =>
                        field.toLowerCase().includes(search.toLowerCase())
                    )) ||
                (movie.comprada === true &&
                    !Object.values(movie).some((field) =>
                        field.toLowerCase().includes(search.toLowerCase())
                    ))
        );

        setFilteredMovies(filteredResults);
    }, [movies, search]);



    return (
        <div>
            <h2 className="center-text">Peliculas Disponibles</h2>
            <div className="movies-container">
                {filteredMovies.length > 0 ? (
                    filteredMovies.map((movie, index) => (
                        <MoviePay
                            key={index}
                            id={movie.id}
                            name={movie.name}
                            director={movie.director}
                            imagen={movie.imagen}
                            idioma={movie.idioma}
                            categoria={movie.categoria}
                            actores={movie.actores}
                            synopsis={movie.synopsis}
                            reviews={movie.reviews}
                            duration={movie.duration}
                            year={movie.year}
                        />
                    ))
                ) : (
                    <LinearProgress color="green" />
                )}
            </div>
        </div>
    );
};
