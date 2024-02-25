import React from "react";
import LinearProgress from "./LinearProgress";
import {MoviePay} from "../components/MoviePay";
import useFetchMovies from "../hooks/useFetchMovies";
import useFetchMoviesByUser from "../hooks/useFetchMoviesByUser";

export const MovieListPurchased = () => {
    const { moviesByUser, loadingUser, errorUser } = useFetchMoviesByUser();
    const { movieDetails, loading, error } = useFetchMovies();

    const filteredResults = getMoviesByUser(movieDetails, moviesByUser);
    console.log("filteredResults");
    console.log(filteredResults);

    if (loading) {
        return <LinearProgress color="green" />;
    }

    if (error || !movieDetails) {
        return <h2>Error al cargar los detalles de la película</h2>;
    }

    return (
        <div>
            <h2 className="center-text">Peliculas Disponibles</h2>
            <div className="movies-container">
                {filteredResults.length > 0 ? (
                    filteredResults.map((movie, index) => (
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

function getMoviesByUser(movieDetails, moviesByUser, setFilteredMovies) {
    /*console.log("movieDetails");
    console.log(movieDetails);

    console.log("moviesByUser");
    console.log(moviesByUser);*/

    let filteredMoviesByUser;

    if (movieDetails.length > 0 && moviesByUser.length > 0) {
        filteredMoviesByUser = movieDetails.filter(movieDetail => moviesByUser.some(
            movieUser => movieUser.movieId === movieDetail.id));
        /*console.log("filteredMoviesByUser");
        console.log(filteredMoviesByUser);*/
    }

    return filteredMoviesByUser;
}