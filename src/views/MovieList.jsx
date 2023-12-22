import React, {useContext, useState} from "react";
import {Movie} from "../components/Movie";
import {MovieContext} from "../context/MovieContext";
import LinearProgress from "./LinearProgress";
import UseSearch from "../hooks/useSearch";

export const MoviesList = () => {

    const {movies} = useContext(MovieContext);
    const [search, setSearch] = useState("");
    const [filteredMovies, setFilteredMovies] = useState(movies);

    const handleSearch = (value) =>{
        setSearch(value)

        const filteredResults = movies.filter((dato) =>
            Object.values(dato).some((field) =>
                field.toLowerCase().includes(value.toLowerCase())
            )
        );
        console.log(movies);

            setFilteredMovies(filteredResults);
    };

    return (
        <div>
        <h2 className="center-text">Peliculas Disponibles</h2>
            <UseSearch onSearch={handleSearch} />
        <div className="movies-container">
            {
                filteredMovies.length > 0 ? (
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
                    imagen={movie.imagen}
                    idioma={movie.idioma}
                    actores={movie.actores}
                    categoria={movie.categoria}
                />
            ))
                ):(
                    <LinearProgress color="green" />
                )
            }
            {}
        </div>
    </div>
    );
};