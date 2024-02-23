import React, {useState, useEffect, useContext} from "react";

export const useSearch = ({ onSearch }) => {
    const [search, setSearch] = useState("");


    const handleSearch = (e) => {
        console.log("Searching with value:", e);
        const value = e.target.value;
        setSearch(value)
        onSearch(value);
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