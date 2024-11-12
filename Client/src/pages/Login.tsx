import React from 'react';
import logo from '../assets/logo.png';
import image from '../assets/image.png';
import { Link } from 'react-router-dom';
import './login.css';

const Login: React.FC = () => {
    return (
        <div className="container">
            <div className="left-panel">
                <img src={logo} alt="Logo" className="logo" />
            </div>
            
            <div className="right-panel">
                <div className="login-content">
                    <div className="login-container">
                        <h1>Log in</h1>
                        <form>
                            <div>
                                <input type="email" placeholder="name@example.com" />
                            </div>
                            <div>
                                <input type="password" placeholder="Password" />
                            </div>
                            <button type="submit">Log In</button>
                        </form>
                        
                        {/* Create Account link */}
                        <Link to="/create-account" className="create-account-link">
                            Create Account
                        </Link>
                        {/* fogot password?*/}
                        <Link to="/create-account" className="create-account-link">
                            Forgot Passward?
                        </Link>
                    </div>
                    <img src={image} alt="Additional" className="additional-image" />
                </div>
            </div>
        </div>
    );
};

export default Login;
