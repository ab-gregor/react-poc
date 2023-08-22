import React, { createContext, useState, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const username = useSelector(state => state.user.name); 

    useEffect(() => {

        const savedCart = localStorage.getItem(`${username}-cart`);
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, [username]);

    useEffect(() => {
        
        localStorage.setItem(`${username}-cart`, JSON.stringify(cart));
    }, [cart, username]);

    const addToCart = (product) => {
        setCart(prevCart => {
            const newCart = [...prevCart, product];
            localStorage.setItem(`${username}-cart`, JSON.stringify(newCart));
            return newCart;
        });
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => {
            const newCart = prevCart.filter(p => p.id !== productId);
            localStorage.setItem(`${username}-cart`, JSON.stringify(newCart));
            return newCart;
        });
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem(`${username}-cart`);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
