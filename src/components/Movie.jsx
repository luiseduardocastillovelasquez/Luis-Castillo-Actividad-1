import React from "react";
import { Link } from "react-router-dom";

export const Movie = ({id, name, director, categoria, idioma, imagen}) => {
    return (
        <div className="movie">
            <h2>{name}</h2>
            <img className="cartel" src={imagen} alt={imagen}/>
            <p>Director: {director}</p>
            <p>Categoria: {categoria}</p>
            <p>Idioma: {idioma}</p>
            <Link to={`/movies/${id}`}>
                <button className="detalle-button"> Ver Detalle</button>
            </Link>
        </div>
    );
}