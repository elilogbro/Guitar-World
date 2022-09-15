import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Store from "./Store";
import Cart from "./Cart";
import Account from "./Account";
import Links from "./Links";
import SignUp from './SignUp';
import Login from "./Login";
import GuitarForm from "./GuitarForm";

function AppRouter() {
    
    const [guitars, setGuitars] = useState([])
    const [customers, setCustomers] = useState([])
    const [guitarsInCart, setGuitarsInCart] = useState([])
    const [user, setUser] = useState([])

    useEffect(() => {
        fetch("http://localhost:9292/guitars")
            .then(res => res.json())
            .then(guitars => setGuitars(guitars));
    }, []);

    useEffect(() => {
        fetch("http://localhost:9292/customers")
            .then(res => res.json())
            .then(customers => setCustomers(customers));
    }, []);

    const sellGuitar = (newGuitar) => {
        setGuitars([...guitars, newGuitar]);
    }

    const handleAddToCartClick = (guitar) => {
        if (guitarsInCart.includes(guitar)) {
            console.log("guitar is already in cart")
        }
        else {
            setGuitarsInCart([...guitarsInCart, guitar])
        }
    }
      
    const createAnAccount = (newCustomer) => {
        setCustomers([...customers, newCustomer])
    }

    const handleDeletedUser = (userId) => {
        setCustomers(customers.filter(customer => customer.id !== userId))
        setUser([])
    }

    const handleUpdatedUser = (updatedUser) => {
        const updateCustomers = customers.map(customer => customer.id === updatedUser.id ? updatedUser : customer)

        setCustomers(updateCustomers)
        setUser([updatedUser])
    }

    const handleCartAfterOrderPlaced = () => {
        setGuitarsInCart([])
    }


    const initialPrice = 0;
    const cartTotal = guitarsInCart.map(guitar => parseFloat(guitar.price)).reduce((previous, current) => previous + current, initialPrice).toFixed(2)

    return (
        <div>
            <Links
                cartTotal={cartTotal}
                user={user}
            />
            <Routes>
                <Route exact path="/" element={
                    <Store 
                        guitars={guitars} 
                        handleAddToCartClick={handleAddToCartClick}
                    />}
                />
                <Route path="/cart" element={
                    <Cart
                        guitarsInCart={guitarsInCart}
                        cartTotal={cartTotal}
                        setGuitarsInCart={setGuitarsInCart}
                        user={user}
                        handleCartAfterOrderPlaced={handleCartAfterOrderPlaced}
                        customers={customers}
                    />}
                />
                { user.length > 0 &&
                    <Route path="/account" element={
                        <Account
                            user={user}
                            handleDeletedUser={handleDeletedUser}
                            handleUpdatedUser={handleUpdatedUser}
                        />}
                    />
                }
                <Route path="/guitar-form" element={
                    <GuitarForm
                        sellGuitar={sellGuitar}
                    />}
                />
                <Route path="/login" element={
                    <Login
                        setUser={setUser}
                        user={user}
                        customers={customers}
                    />}
                />
                <Route path="/signup" element={
                    <SignUp
                        createAnAccount={createAnAccount}
                    />}
                />
                <Route path="*" element={
                    <Navigate to="/" replace />}
                />
            </Routes>
        </div>
    )
}

export default AppRouter;