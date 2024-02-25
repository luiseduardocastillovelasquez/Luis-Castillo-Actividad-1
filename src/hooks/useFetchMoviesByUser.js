import { useState, useEffect } from 'react';

const useFetchMoviesByUser = () => {
    const [ moviesByUser, setMoviesByUser ] = useState([]);
    const [loadingUser, setLoadingUser] = useState(true);
    const [errorUser, setErrorUser] = useState(null);

    const userId = JSON.parse(localStorage.getItem('userId'));

    useEffect(() => {
        const fetchMoviesByUser = async () => {
            try {
                let url = process.env.REACT_APP_API_URL_ORDER;
                const queryParamStatus ={
                    status: 'CONFIRMED'
                };
                if (userId) {
                    url += `/users/${userId}/orders?status=${encodeURIComponent(queryParamStatus.status)}`;
                }
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        targetMethod: 'GET'
                    }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const datos = await response.json();
                /*console.log("useFetchMovieByUser");
                console.log(datos);

                console.log("datos.data");
                console.log(datos.data[0]);*/

                /*console.log("datos.data.orderDetails");
                console.log(datos.data[0].orderDetails);*/
                setMoviesByUser(datos.data[0].orderDetails);
            } catch (error) {
                setErrorUser(error);
            } finally {
                setLoadingUser(false);
            }
        };
        fetchMoviesByUser();
    }, []); // Este useEffect se ejecuta solo una vez, al montar el componente

    return { moviesByUser, loadingUser, errorUser };
};

export  default useFetchMoviesByUser;