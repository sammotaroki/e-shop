import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';

export default function RegisterScreen(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/';

    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo, loading, error } = userRegister;

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords are not identical')
        } else {
            dispatch(register(name, email, password));
        }
    }

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div className="sign_up">
                    <h1>Sign Up</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div className="form_content">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="John Doe"
                        required
                        onChange={(e) => setName(e.target.value)}
                    ></input>
                </div>
                <div className="form_content">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="example@mail.com"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>
                </div>
                <div className="form_content">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                </div>
                <div className="form_content">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></input>
                </div>
                <div className="sign_up_btn_container">
                    <label />
                    <button className="primary sign_up" type="submit">
                        Sign Up
                    </button>
                </div>
                <div className="already_have sign_up">
                    <label />
                    <div>
                        Already have account?
                        <Link to={`/signin?redirect=${redirect}`} className="back">Sign In</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
