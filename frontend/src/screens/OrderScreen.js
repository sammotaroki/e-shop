import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder, payOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_PAY_RESET } from '../constants/orderConstants';


export default function OrderScreen(props) {

    const orderId = props.match.params.id;
    const [sdkReady, setSdkReady] = useState(false);

    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const orderPay = useSelector(state => state.orderPay);
    const { loading: loadingPay, error: errorPay, success: successPay } = orderPay;

    const dispatch = useDispatch();

    useEffect(() => {
        const addPayPalScript = async () => {
            const { data } = await axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };

        if (!order || successPay || (order && order._id !== orderId)) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch(detailsOrder(orderId));
        } else {
            if (!order.isPaid) {
                if (!window.paypal) {
                    addPayPalScript();
                } else {
                    setSdkReady(true);
                }
            }
        }
    }, [dispatch, order, orderId, sdkReady, successPay]);

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(order, paymentResult))
    }

    return loading ? (<LoadingBox></LoadingBox>)
        : error ? (<MessageBox variant="danger">{error}</MessageBox>)
            : (
                <div>
                    <h1 className="ord-no">Order No. {order._id}</h1>
                    <div className="row inv">
                        <div className="col-2">
                            <ul>
                                <li>
                                    <div className="card card-body fade">
                                        <h2>Shipping</h2>
                                        <p>
                                            <strong>Name : </strong>{order.shippingAddress.fullName} <br />
                                            <strong>Address : </strong>
                                            {order.shippingAddress.address}. {order.shippingAddress.city},  {order.shippingAddress.postalCode}. {order.shippingAddress.country}

                                        </p>
                                        {order.isDelivered ? (
                                            <MessageBox variant="success">Delivered on {order.deliveredAt}</MessageBox>
                                        ) : (
                                            <MessageBox variant="danger">Awaiting delivery</MessageBox>
                                        )}
                                    </div>
                                </li>
                                <li>
                                    <div className="card card-body fade">
                                        <h2>Payment</h2>
                                        <p>
                                            <strong>Method :</strong> {order.paymentMethod}
                                        </p>
                                        {order.isPaid ? (
                                            <MessageBox variant="success">Paid on {order.paidAt}</MessageBox>
                                        ) : (
                                            <MessageBox variant="danger">Awaiting payment</MessageBox>
                                        )}
                                    </div>
                                </li>
                                <li>
                                    <div className="card card-body ordr">
                                        <h2>Shopping Cart</h2>
                                        <ul>
                                            {order.orderItems.map((item) => (
                                                <li key={item.product}>
                                                    <div className="row">
                                                        <div>
                                                            <img
                                                                src={item.image}
                                                                alt={item.name}
                                                                className="small"
                                                            ></img>
                                                        </div>
                                                        <div className="min-30">
                                                            <Link className="item-name cart" to={`/product/${item.product}`}>{item.name}</Link>
                                                        </div>

                                                        <div className="price cart">
                                                            <span className="tiny">({item.qty} * {item.price})</span> {item.qty * item.price}
                                                        </div>

                                                    </div>
                                                </li>
                                            ))
                                            }
                                        </ul>

                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="col-1">
                            <div className="card card-body fade">
                                <ul>
                                    <li>
                                        <h2>Order Summary</h2>
                                    </li>
                                    <li>
                                        <div className="row prod">
                                            <div>Items</div>
                                            <div>€ {order.itemsPrice.toFixed(2)}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row prod">
                                            <div>Shipping</div>
                                            <div>€ {order.shippingPrice.toFixed(2)}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row prod">
                                            <div>Tax</div>
                                            <div>€ {order.taxPrice.toFixed(2)}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row prod">
                                            <div><strong>Order Total</strong></div>
                                            <div><strong>€ {order.totalPrice.toFixed(2)}</strong></div>
                                        </div>
                                    </li>
                                    {
                                        !order.isPaid && (
                                            <li>
                                                {
                                                    !sdkReady ? (
                                                        <LoadingBox></LoadingBox>
                                                    ) :
                                                        (
                                                            <>
                                                                {errorPay && (
                                                                    <MessageBox variant="danger">{errorPay}</MessageBox>
                                                                )}
                                                                {loadingPay && (<LoadingBox></LoadingBox>)}
                                                                <PayPalButton
                                                                    amount={order.totalPrice}
                                                                    onSuccess={successPaymentHandler}
                                                                ></PayPalButton>
                                                            </>
                                                        )
                                                }
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )
}
