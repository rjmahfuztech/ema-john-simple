import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    document.title = "Shop Mor";

    useEffect(() => {
        fetch('https://morning-everglades-82763.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        fetch('https://morning-everglades-82763.herokuapp.com/productsByKeys', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(productKeys),
        })
        .then(res => res.json())
        .then(data => setCart(data));
    }, []);

    // useEffect(() => {
    //     const savedCart = getDatabaseCart();
    //     const productKeys = Object.keys(savedCart);
    //     console.log(products, productKeys);
    //     if (products.length > 0) {
    //         const previousCart = productKeys.map(existingKey => {
    //             const product = products.find(pd => pd.key === existingKey);
    //             product.quantity = savedCart[existingKey];
    //             return product;
    //         })
    //         setCart(previousCart);
    //     }
    // }, [products]);

    const handleAddProduct = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }

        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }

    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(pd => <Product key={pd.key} handleAddProduct={handleAddProduct} showAddToCart={true} product={pd}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="main-btn">Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;