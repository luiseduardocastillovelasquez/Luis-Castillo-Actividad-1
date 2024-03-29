import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import LinearProgress from "./LinearProgress";
import useFetchMovies from "../hooks/useFetchMovies";

const MovieDetails = () => {
    const {movieId} = useParams();

    const { movieDetails, loading, error } = useFetchMovies(movieId, null);

    const [verPeliculaEnabled, setVerPeliculaEnabled] = useState(false);

    const [loadingOrder, setLoadingOrder] = useState(true);
    const [errorOrder, setErrorOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showModalComprar, setShowModalComprar] = useState(false);
    const [dataOrder, setDataOrder] = useState();

    const userId = JSON.parse(localStorage.getItem('userId'));

    const pagarAlquiler = () => {
        // ocultamos nuestra ventana Modal
        setShowModal(false);
        createOrder(userId, movieId, 'RENT');
    };

    const pagarComprar = () => {
        setShowModalComprar(false);
        createOrder(userId, movieId, 'PURCHASE');
    };

    const createOrder = async (userId, movieId, type) => {
        try {
            let url = process.env.REACT_APP_API_URL_ORDER + '/orders';

            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    targetMethod: 'POST',
                    body: {
                        userId: Number(userId),
                        orders: [
                            {
                                movieId: movieId,
                                type: type
                            }
                        ]
                    }
                }),
            }).then(async function (resultArray) {
                const response = await resultArray.json();
                fetch(url + `/${response.data.id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        targetMethod: 'PATCH',
                        body: {
                            status: "CONFIRMED"
                        }
                    }),
                }).then(async response => {
                    const response2 = await response.json();
                    console.log("response2:");
                    console.log(response2);
                    if (response.ok) {
                        setDataOrder(response2.data);
                        setVerPeliculaEnabled(true);
                    } else {
                        setVerPeliculaEnabled(false);
                    }
                });
            });
        } catch (error) {
            setVerPeliculaEnabled(false);
            setErrorOrder(error);
        } finally {
            setLoadingOrder(false);
        }
    }

    if (loading) {
        return <LinearProgress color="green" />;
    }

    if (error || !movieDetails) {
        return <h2>Error al cargar los detalles de la película</h2>;
    }

    return (
        <div className="movie">
            <h2>{movieDetails.name}</h2>
            <img className="cartel" src={movieDetails.image} alt={movieDetails.image}/>
            <div className="movie-details">
                <div className="column">
                    <p>Sinopsis: <span>{movieDetails.synopsis}</span></p>
                    <p>Director: <span>{movieDetails.director}</span></p>
                    <p>Duracion: <span>{movieDetails.duration} minutos</span></p>
                    <p>Año: <span>{movieDetails.releaseYear}</span></p>
                    <p>Valor Compra: <span>${movieDetails.purchaseValue} Pesos</span></p>
                </div>
                <div className="column">
                    <p>Criticas: <span>{movieDetails.reviews}</span></p>
                    <p>Actores: <span>{movieDetails.actors}</span></p>
                    <p>Idioma: <span>{movieDetails.language && movieDetails.language.length > 0
                        ? movieDetails.language.map(cat => cat.name).join(', ')
                        : 'Sin idioma'}</span></p>
                    <p>Categorias: <span>{movieDetails.language && movieDetails.categorias.length > 0
                        ? movieDetails.categorias.map(cat => cat.name).join(', ')
                        : 'Sin idioma'}</span></p>
                    <p>Valor Alquiler: <span>${movieDetails.rentalValue} Pesos</span></p>
                </div>
            </div>
            <button className="detalle-button" onClick={() => setShowModalComprar(true)}>
                Comprar
            </button>
            <button className="detalle-button" onClick={() => setShowModal(true)}>
                Alquilar
            </button>

            <Link to={`/verMovie/${movieId}`}>
                <button
                    className={`detalle-button ${!verPeliculaEnabled ? "disabled-button" : ""}`}
                    disabled={!verPeliculaEnabled}
                >Ver Película</button>
            </Link>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p>¿Estás seguro de que quieres alquilar?</p>
                        <p>{movieDetails.name} a <span>${movieDetails.rentalValue} Pesos</span></p>
                        <button className="detalle-button" onClick={pagarAlquiler}>Aceptar</button>
                        <button className="detalle-button" onClick={() => setShowModal(false)}>Cancelar</button>
                    </div>
                </div>
            )}
            {showModalComprar && (
                <div className="modal">
                    <div className="modal-content">
                        <p>¿Estás seguro de que quieres comprar la Pelicula?</p>
                        <p>{movieDetails.name}</p>
                        <p>Valor Compra: <span>${movieDetails.purchaseValue} Pesos</span></p>
                        <button className="detalle-button" onClick={pagarComprar}>Aceptar</button>
                        <button className="detalle-button" onClick={() => setShowModalComprar(false)}>Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MovieDetails;