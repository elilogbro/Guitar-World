import React from "react";

function Search({searchQuery, setSearchQuery}) {


    return (
        <div className="search-container">
            <input type="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search for a guitar..."></input>
        </div>
    )
}

export default Search;