import React, { useEffect } from 'react';
import Product from '../components/Product';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import Logo from '../assets/logo.png'
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

export default function HomeScreen() {

    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <div>

            {
                loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <div>
                        <div className="header">
                            <div className="banner-text">
                                <span>Limited offer</span>
                                <strong>30% off with <span>promo code</span></strong>
                                <a href="/" className="banner-btn">Shop Now</a>
                            </div>
                            <div>
                                <img src={Logo} alt="pic"/>
                            </div>
                        </div>
                        <a href="#products"><p className="all">See All</p></a>
                        <div className="row center">
                            {
                                products.map((product) => (
                                    <Product key={product._id} product={product}></Product>
                                ))
                            }
                        </div>
                        <div className="header">
                            <div className="banner-text">
                                <span>Limited offer</span>
                                <strong>30% off with <span>promo code</span></strong>
                                <a href="/" className="banner-btn">Shop Now</a>
                            </div>
                            <div>
                                <img src={Logo} alt="pic"/>
                            </div>
                        </div>
                        <a href="#products"><p className="all">See All</p></a>
                        <div className="row center">
                            {
                                products.map((product) => (
                                    <Product key={product._id} product={product}></Product>
                                ))
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}
