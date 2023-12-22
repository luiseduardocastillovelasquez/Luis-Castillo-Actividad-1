import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <div>
        <Link to={`/home`} className="menu-link">
            <button className="menu-button">Ver Catalogo</button>
        </Link>
        <Link to={`/moviespurchased/`} className="menu-link">
            <button className="menu-button">Peliculas Compradas o Alquiladas</button>
        </Link>
        </div>
    );
};

export default Menu;