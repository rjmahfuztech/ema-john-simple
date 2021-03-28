import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Review.css';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory();

    const handleProceedCheckout = () => {

        history.push('/shipment');
    }

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

        // const cartProducts = productKeys.map(key => {
        //     const product = fakeData.find(pd => pd.key === key);
        //     product.quantity = savedCart[key];
        //     return product;
        // });
        // setCart(cartProducts);
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
                    <button onClick={handleProceedCheckout} className="main-btn">Proceed Checkout</button>
                </Cart>

            </div>
        </div>
    );
};

export default Review;