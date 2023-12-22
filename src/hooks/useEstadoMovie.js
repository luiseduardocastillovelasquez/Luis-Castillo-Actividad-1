import  { useEffect, useState } from "react";

export const useEstadoMovie = ({ movieId, onAlquilar, onComprar }) => {
    const [verPeliculaEnabled, setVerPeliculaEnabled] = useState(false);

    useEffect(() => {
        const handleAlquilerTimeout = () => {
            // cuando pase el tiempo volvemos a dejar en falso el alquiler de la pelicula
            setVerPeliculaEnabled(false);

            // traemos el obejeto del localstorage
            const storedData = JSON.parse(localStorage.getItem(`movie_${movieId}`)) || {};

            // lo seteamos a false
            const updatedData = {
                ...storedData,
                alquiler: false,
            };

            // despues de realizar los cambios guardamos nuevamete en el localstorage
            localStorage.setItem(`movie_${movieId}`, JSON.stringify(updatedData));
        };

        // traemos la informacion de localstorage
        const storedData = JSON.parse(localStorage.getItem(`movie_${movieId}`)) || {};

        // validamos si el estado de alquiler es true en el localStorage
        if (storedData.alquiler) {
            setVerPeliculaEnabled(true);

            //como el alquiler es por un  timepo aca establecemos el tiempo en el que puede ver la pelicula alquilada
            const timeoutId = setTimeout(() => {
                handleAlquilerTimeout();
                clearTimeout(timeoutId);
            }, 10 * 1000);
        }
    }, [movieId]);

    const alquilarPelicula = () => {
        // cambiamos el estado de la variable alquiler por true
        setVerPeliculaEnabled(true);

        // jalamos los ojetos del localstorage
        const storedData = JSON.parse(localStorage.getItem(`movie_${movieId}`)) || {};
        const updatedData = {
            id: movieId,
            alquiler: true,
            comprada: storedData.comprada || false,
        };
        localStorage.setItem(`movie_${movieId}`, JSON.stringify(updatedData));
        if (onAlquilar) {
            onAlquilar();
        }
    };

    const comprarPelicula = () => {
        setVerPeliculaEnabled(true);
        const storedData = JSON.parse(localStorage.getItem(`movie_${movieId}`)) || {};
        const updatedData = {
            id: movieId,
            comprada: true,
            alquiler: storedData.alquiler || false,
        };

        localStorage.setItem(`movie_${movieId}`, JSON.stringify(updatedData));
        if (onComprar) {
            onComprar();
        }
    };

    return { verPeliculaEnabled, alquilarPelicula , comprarPelicula};
};

export default useEstadoMovie;