import React from "react";
import GuitarCard from "./GuitarCard";

function Cart({guitarsInCart, cartTotal, setGuitarsInCart, user, handleCartAfterOrderPlaced}) {

    document.body.style.backgroundImage = "url('https://wallpaperaccess.com/full/733839.jpg')"
    document.body.style.backgroundRepeat = "repeat"
    document.body.style.backgroundSize = 'auto'
    
    const handleDeleteFromCartClick = (guitar) => {
        const filterGuitarsInCart = guitarsInCart.filter(guitarInCart => guitarInCart.id !== guitar.id)
        setGuitarsInCart(filterGuitarsInCart)
    }

    const renderGuitarsInCart = guitarsInCart.map(guitar =>
        <GuitarCard guitar={guitar} isInCart={true} key={guitar.id} handleDeleteFromCartClick={handleDeleteFromCartClick} placeOrder={placeOrder}/>)


    const placeOrder = () => {
        if (user.length > 0 && guitarsInCart.length > 0) {
            guitarsInCart.forEach(guitar => {
                fetch('http://localhost:9292/orders', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({guitar_id: guitar.id, customer_id: user[0].id})
            })
            .then(res => res.json())
            .then(handleCartAfterOrderPlaced)
            })

            alert('Order placed successfully!');
        }
        else if (user.length > 0 && guitarsInCart.length === 0) {
            alert('Add guitars to your cart!')
        }
        else {
            alert('Must be logged in to place an order.')
        }
    }

    const isValid = Boolean(guitarsInCart.length > 0 && user.length > 0)

    return (
        <div className="cart-container">
            <div className="cart-header">
                <h2>Total: ${cartTotal}</h2>
                <button id="order-btn" onClick={placeOrder} disabled={!isValid}>{isValid ? "Place order" : "Please log in & add guitars"}</button>
            </div>
            <div className="guitar-cart-container">
                {renderGuitarsInCart}
            </div>
        </div>
    )
}

export default Cart;