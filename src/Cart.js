import React from "react";
import GuitarCard from "./GuitarCard";

function Cart({guitarsInCart, cartTotal, setGuitarsInCart}) {

    document.body.style.backgroundImage = "url('https://cdn.pixabay.com/photo/2017/02/07/09/02/wood-2045379_960_720.jpg')"
    document.body.style.backgroundRepeat = "repeat"
    document.body.style.backgroundSize = 'auto'
    
    const handleDeleteFromCartClick = (guitar) => {
        const filterGuitarsInCart = guitarsInCart.filter(guitarInCart => guitarInCart.id !== guitar.id)
        setGuitarsInCart(filterGuitarsInCart)
    }

    const renderGuitarsInCart = guitarsInCart.map(guitar =>
        <GuitarCard guitar={guitar} isInCart={true} key={guitar.id} handleDeleteFromCartClick={handleDeleteFromCartClick}/>)

    return (
        <div className="cart-container">
            <h2>Total: ${cartTotal}</h2>
            <span id="order-btn">Place Order</span>
            <div className="guitar-cart-container">
                {renderGuitarsInCart}
            </div>
        </div>
    )
}

export default Cart;