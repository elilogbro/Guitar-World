import React from "react";

function GuitarCard({guitar, handleAddToCartClick, isInCart, handleDeleteFromCartClick}) {

    return (
        <div className={isInCart ? "cart-card" : "card"}>
            <img id="guitar-img" src={guitar.image_url} alt={guitar.name} />
            <div className="details-container">
                <div id="guitar-details">{guitar.description}</div>
            </div>
            <p id="name-container">{guitar.name}</p>
            <p>${guitar.price}</p>
            { !isInCart  &&
                ( <button id="add-to-cart-btn" onClick={ () => handleAddToCartClick(guitar) }>Add To Cart</button> )
            }
            { isInCart && 
                ( <button id="delete-btn" onClick={ () => handleDeleteFromCartClick(guitar) }>Remove From Cart</button> )
            }
        </div>
    )
}

export default GuitarCard;