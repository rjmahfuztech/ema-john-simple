import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Review.css';
import happyImage from '../../images/giphy.gif';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handlePlaceOrder = () => {
        // console.log('order placed');
        setCart([]);
        setOrderPlaced(true);
        processOrder();
    }

    useEffect(() => {
        // cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
    }, []);

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    
    let thankYou;
    if(orderPlaced){
        thankYou = <img src={happyImage} alt=""/>
    }
    return (
        <div className="review-container">
            <div className="product-review">
                {
                    cart.map(pd => <ReviewItem 
                        key={pd.key} 
                        removeProduct={removeProduct} 
                        product={pd}>
                        </ReviewItem>)
                }

                {thankYou}

            </div>
            <div className="review-cart">
                <Cart cart = {cart}>
                    <button onClick={handlePlaceOrder} className="main-btn">Place Order</button>
                </Cart>

            </div>
        </div>
    );
};

export default Review;