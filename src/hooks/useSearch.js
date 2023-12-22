import React, {useState, useEffect, useContext} from "react";
import {MovieContext} from "../context/MovieContext";


export const useSearch = ({ onSearch }) => {
    const [search, setSearch] = useState("");

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value)
        onSearch(search);
    };

    return (
        <div>
        <input
            value={search}
            onChange={handleSearch}
            type="text"
            placeholder="Search"
            className="form-control"
        />
        </div>
    );
};
export default useSearch