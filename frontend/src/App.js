import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import logo from "./assets/logo.png"
import CartScreen from './screens/CartScreen';
import { useSelector } from 'react-redux';


function App() {

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    return (
        <BrowserRouter>
            <div className="grid-container">
                <header className="row">
                    <div>
                        <Link className="brand" to="/">
                            <img src={logo} alt="logo" />
                        </Link>
                    </div>
                    <div>
                        <Link to="/cart">
                            Cart
                            {cartItems.length > 0 && (
                                <span className="badge">{cartItems.length}</span>
                            )}
                        </Link>
                        <Link to="/signin">Sign In</Link>
                    </div>
                </header>
                <main>
                    <Route path="/cart/:id?" component={CartScreen}></Route>
                    <Route path="/product/:id" component={ProductScreen} ></Route>
                    <Route path="/" component={HomeScreen} exact ></Route>

                </main>
                <footer className="row center">Copyright</footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
