import React, { useState, useEffect } from "react";
import GuitarCard from "./GuitarCard";
import OrderCard from './OrderCard';

function Cart({guitarsInCart, cartTotal, setGuitarsInCart, user, handleCartAfterOrderPlaced}) {

    document.body.style.backgroundImage = "url('https://wallpaperaccess.com/full/733839.jpg')"
    document.body.style.backgroundRepeat = "repeat"
    document.body.style.backgroundSize = 'auto'

    const [userOrders, setUserOrders] = useState([])
    
    const handleDeleteFromCartClick = (guitar) => {
        const filterGuitarsInCart = guitarsInCart.filter(guitarInCart => guitarInCart.id !== guitar.id)
        setGuitarsInCart(filterGuitarsInCart)
    }

    const renderGuitarsInCart = guitarsInCart.map(guitar =>
        <GuitarCard guitar={guitar} isInCart={true} key={guitar.id} handleDeleteFromCartClick={handleDeleteFromCartClick} placeOrder={placeOrder}
        />)

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
    }

    useEffect(() => {
            if (user.length > 0) {
                fetch(`http://localhost:9292/orders/${user[0].id}`)
                .then(res => res.json())
                .then(userOrders => setUserOrders(userOrders))
            }
        }, [userOrders])

    const renderUserOrders = userOrders.map(order => 
        <OrderCard order={order} key={order.order_number}/>)

    const isValid = Boolean(guitarsInCart.length > 0 && user.length > 0)

    return (
        <div className="cart-container">
                <div className="guitar-cart-container">
                    <div className="cart-headers">
                        <h2>Total: ${cartTotal}</h2>
                        <button id="order-btn" onClick={placeOrder} disabled={!isValid}>{isValid ? "Place order" : "Please log in & add guitars"}
                        </button>
                    </div>
                        <h1>Cart Items</h1>
                    <div className="guitars-in-cart">
                        {renderGuitarsInCart}
                    </div>
                </div>
                <div className="order-container">
                    <h1>Order History</h1>
                    <div className="overflow-container">
                        {renderUserOrders}
                    </div>
                </div>
        </div>
    )
}

export default Cart;