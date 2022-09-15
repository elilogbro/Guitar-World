import React, { useState } from "react";
import Search from './Search';
import GuitarCard from './GuitarCard';

function Store({guitars, handleAddToCartClick,}) {
    
    document.body.style.backgroundImage = "url('https://img.freepik.com/premium-vector/knitted-dark-gray-background-with-repeating-texture-merino-wool-black-vector-seamless-pattern_278395-576.jpg')";
    document.body.style.backgroundRepeat = "repeat"
    document.body.style.backgroundSize = 'auto'

    const [searchQuery, setSearchQuery] = useState("")

    const filterGuitars = guitars.filter(guitar => guitar.name.toLowerCase().includes(searchQuery.toLowerCase()))

    const renderCards = filterGuitars.map(guitar =>
        <GuitarCard
            guitar={guitar}
            key={guitar.id}
            handleAddToCartClick={handleAddToCartClick}
            isInCart={false}
        />
    )
    
    return (
        <div className="search-and-cards">
            <Search
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}    
            />
            <div className="cards-container">
                {renderCards}
            </div>
        </div>
    )
}

export default Store;