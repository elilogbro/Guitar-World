import React, { useState } from "react";
import Search from './Search';
import GuitarCard from './GuitarCard';

function Store({guitars, handleAddToCartClick,}) {
    
    document.body.style.backgroundImage = "url('https://images.pexels.com/photos/172292/pexels-photo-172292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')";
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
            isInOrders={false}
        />
    )
    
    return(
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