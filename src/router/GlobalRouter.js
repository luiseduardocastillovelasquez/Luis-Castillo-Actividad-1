import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from '../views/NotFound';
import MovieDetails from "../views/MovieDetails";
import VerMovie from "../views/VerMovie";
import {MoviesList} from "../views/MovieList";
import Home from "../views/Home";
import Menu from "../components/Menu";
import {MovieListPurchased} from "../views/MovieListPurchased";
import Landing from "../views/Landing";

function GlobalRouter() {
    return (
        <BrowserRouter>
            <Menu/>
            <Routes>
                <Route path="/home" element={<Landing />} />
                <Route path="/" element={<Home />} index />
                <Route path="/movies" element={<Layout><MoviesList /></Layout>} />
                <Route path="/movies/:movieId" element={<Layout><MovieDetails /></Layout>} />
                <Route path="/vermovie/:movieId" element={<Layout><VerMovie /></Layout>} />
                <Route path="/moviespurchased" element={<Layout><MovieListPurchased /></Layout>} />
                <Route path="*" element={<Layout><NotFound /></Layout>} />
            </Routes>
        </BrowserRouter>
    );
}

const Layout = ({children}) => (
    <>
        {children}
    </>
);

export default GlobalRouter;