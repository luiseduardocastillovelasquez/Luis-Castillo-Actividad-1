import React from "react";
import { Link } from "react-router-dom";

export const MoviePay = ({id, name, director, categoria, idioma,
                             imagen, actores, synopsis,reviews,duration,year}) => {
    return (
        <div className="movie">
            <h2>{name}</h2>
            <img className="cartel" src={imagen} alt={imagen}/>
            <p>Director: {director}</p>
            <p>Categoria: {categoria}</p>
            <p>Idioma: {idioma}</p>
            <p>Actores: {actores}</p>
            <p>Descripsion: {synopsis}</p>
            <p>Criticas: {reviews}</p>
            <p>Duracion: {duration} min</p>
            <p>Año: {year}</p>
            <Link to={`/vermovie/${id}`}>
                <button className="detalle-button"> Ver Pelicula</button>
            </Link>
        </div>
    );
}