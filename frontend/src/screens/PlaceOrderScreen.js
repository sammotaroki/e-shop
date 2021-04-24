import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';

export default function PlaceOrderScreen(props) {

    const cart = useSelector((state) => state.cart);
    if (!cart.paymentMethod) {
        props.history.push('/payment');
    }

    const toPrice = (num) => Number(num.toFixed(2));

    cart.itemsPrice = toPrice(cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
    );
    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
    cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
    cart.totalPrice = toPrice(cart.itemsPrice + cart.shippingPrice + cart.taxPrice);

    const placeOrderHandler = () => {

    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>
            <div className="row inv">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body fade">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name : </strong>{cart.shippingAddress.fullName} <br />
                                    <strong>Address : </strong>
                                    {cart.shippingAddress.address}. {cart.shippingAddress.city},  {cart.shippingAddress.postalCode}. {cart.shippingAddress.country}

                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body fade">
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method :</strong> {cart.paymentMethod}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body ordr">
                                <h2>Shopping Cart</h2>
                                <ul>
                                    {cart.cartItems.map((item) => (
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
                                    <div>€ {cart.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row prod">
                                    <div>Shipping</div>
                                    <div>€ {cart.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row prod">
                                    <div>Tax</div>
                                    <div>€ {cart.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row prod">
                                    <div><strong>Order Total</strong></div>
                                    <div><strong>€ {cart.totalPrice.toFixed(2)}</strong></div>
                                </div>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={placeOrderHandler}
                                    className="primary block"
                                    disabled={cart.cartItems.length === 0}
                                >
                                    Place Order
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
