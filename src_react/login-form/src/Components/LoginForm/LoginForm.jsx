import React from 'react';
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";

const LoginForm = () => {
    return (
        <div className='wrapper'>
            <form action="">
                <h1>Login</h1>
                <div className="input-box">
                    <input type="text" placeholder='Username' required />
                    <FaUser className='icon' />
                </div>
                <div className="input-box">
                    <input type="password" placeholder='Password' required />
                    <FaLock className='icon' />
                </div>
                <div className="remember-forgot">
                    <label><input type="checkbox" />Remember me</label>
                    <a href= "#">Forgot password?</a>
                </div>

                <button type="submit">Login</button>

                <div className="regiter-link">
                    <p>Don't have an account?<a href="#">Register</a></p>
                </div>



            </form>

        </div>
    );

};

export default LoginForm;