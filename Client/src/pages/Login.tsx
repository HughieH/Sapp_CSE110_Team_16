import React from 'react';
import logo from '../images/logo.png';
import image from '../images/image.png';
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
                    </div>
                    <img src={image} alt="Additional" className="additional-image" />
                </div>
            </div>
        </div>
    );
};

export default Login;
