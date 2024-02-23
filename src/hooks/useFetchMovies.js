import { useState, useEffect } from 'react';

const useFetchMovies = (movieId, serviceType) => {
    const [movieDetails, setMovieDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                let url = process.env.REACT_APP_API_URL_MOVIE;
                if (movieId) {
                    url += `/${movieId}`;
                }   else if (serviceType === 'agregate') {
                    url += `?agregate=true`;
                }

                const response = await fetch(url, {
                    method: 'POST',
                    mode: 'no-cors',
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
    }, [movieId, serviceType]); // Este useEffect se ejecuta solo una vez, al montar el componente

    return { movieDetails, loading, error };
};

export default useFetchMovies;
