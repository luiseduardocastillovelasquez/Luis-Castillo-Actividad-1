import React from "react";
import { Link } from "react-router-dom";

export const Movie = ({id, name, director, idiomas, imagen, categorias}) => {

    return (
        <div className="movie">
            <h2>{name}</h2>
            <img className="cartel" src={imagen} alt={imagen}/>
            <p>Director: {director}</p>
            <p>Categorias: {categorias && categorias.length > 0
                ? categorias.map(cat => cat.name).join(', ')
                : 'Sin categoría'}
            </p>
            <p>Idiomas: {idiomas && idiomas.length > 0
                ? idiomas.map(cat => cat.name).join(', ')
                : 'Sin idiomas'}
            </p>
            <Link to={`/movies/${id}`}>
                <button className="detalle-button"> Ver Detalle</button>
            </Link>
        </div>
    );
}