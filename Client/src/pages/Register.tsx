import React from 'react';
import logo from '../assets/logo.png';
import Register from '../assets/register.png';
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
                        <h1>Create Account</h1>
                        <form>
                            <div>
                                <input type="email" placeholder="name@example.com" />
                            </div>
                            <div>
                                <input type="password" placeholder="Password" />
                            </div>
                            <button type="submit">Sign up with email</button>
                        </form>
                        {/* Going back to login page */}
                        <div style={{ textAlign: 'center', fontSize: '22px', color: 'white' }}>
                          Already signed up? Go to&nbsp;
                          <Link 
                            to="/Login" 
                            style={{ color: 'white', textDecoration: 'underline' }}
                          >
                            Login
                          </Link>
                      </div>
                    </div>
                    <img src={Register} alt="Additional" className="additional-image" />
                </div>
            </div>
        </div>
    );
};

export default Login;
