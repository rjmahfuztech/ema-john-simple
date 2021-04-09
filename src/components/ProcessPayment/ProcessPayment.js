import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardForm from '../SimpleCardForm/SimpleCardForm';
// import SplitCardForm from '../SplitCardForm/SplitCardForm';

const stripePromise = loadStripe('pk_test_51IeBG1DcP6n2XaXcl9fLow4LIgJukEM7IDT8srH1rB4jXWkvWL7Zvil4C2SXsWrA2MAOeMYDYj6eCEYHA0jOubwS006GmI2eUH');

const ProcessPayment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>
            <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
            {/* <SplitCardForm></SplitCardForm> */}
        </Elements>
    );
};

export default ProcessPayment;