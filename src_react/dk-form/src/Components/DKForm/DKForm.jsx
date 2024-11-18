import React from 'react';
import './DKForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const DKForm = () => {
    return (
        <div className='wrapper'>
            <form action="">
                <h1>Register</h1>
                <div className="input-box">
                    <input type="text" placeholder='Username' required />
                    <FaUser className='icon' />
                </div>
                <div className="input-box">
                    <input type="email" placeholder='Email' required />
                    <MdEmail className='icon' />
                </div>
                <div className="input-box">
                    <input type="password" placeholder='Password' required />
                    <FaLock className='icon' />
                </div>
                <div className="input-box">
                    <input type="confirm password" placeholder='Confirm Password' required />
                    <FaLock className='icon' />
                </div>
                <button type="submit">Sign Up</button>

                <div className="account-link">
                    <a href="#">Already have an account? </a>
                </div>



            </form>

        </div>
    );

};

export default DKForm;