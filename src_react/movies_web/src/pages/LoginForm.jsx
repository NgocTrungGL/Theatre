import React from 'react';
import { FaUser, FaLock } from "react-icons/fa";
import './LoginForm.css';
 
const LoginForm = ({ setCurrentPage }) => {
    const navigateTo = (page) => {
        setCurrentPage(page);
    };
 
    return (
        <div className="wrapper">
            <form action="">
                <h1>Login</h1>
                <div className="input-box">
                    <input type="text" placeholder="Username" required />
                    <FaUser className="icon" />
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Password" required />
                    <FaLock className="icon" />
                </div>
                <div className="remember-forgot">
                    <label>
                        <input type="checkbox" />
                        Remember me
                    </label>
                    <a href="#">Forgot password?</a>
                </div>
 
                <button type="submit" onClick={() => navigateTo('home')}>Login</button>
 
                <div className="register-link">
                    <p>
                        Don't have an account?{' '}
                        <a href="#" onClick={() => navigateTo('register')}>Register</a>
                    </p>
                </div>
            </form>
        </div>
    );
};
 
export default LoginForm;