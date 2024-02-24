import React from "react";
import {Movie} from "../components/Movie";
import LinearProgress from "./LinearProgress";
import useFetchMovies from "../hooks/useFetchMovies";
import {Link, useParams} from "react-router-dom";

export const MoviesCategoryList = () => {
    const {category} = useParams();
    const {movieDetails, loading, error} = useFetchMovies(null, category);

    if (loading) {
        return <LinearProgress color="green"/>;
    }

    if (error || !movieDetails) {
        return <h2>Error al cargar los datos de las películas</h2>;
    }

    return (
        <div>
            <h2 className="center-text">Peliculas Disponibles para la Categoría {category}</h2>

            <Link to={`/movies`}>
                <button className="detalle-button">Volver al listado</button>
            </Link>

            <div className="movies-container">
                {
                    movieDetails.map((movie, index) => (
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
                        )
                    )}
            </div>
        </div>
    );
};
