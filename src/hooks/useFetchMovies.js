import { useState, useEffect } from 'react';

const useFetchMovies = () => {
    const [movieDetails, setMovieDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch('http://localhost:8762/ms-inventory-movies/movies', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ targetMethod: 'GET' }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const movies = await response.json();
                console.log(movies);
                setMovieDetails(movies);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, []); // Este useEffect se ejecuta solo una vez, al montar el componente

    return { movieDetails, loading, error };
};

export default useFetchMovies;
