import React, {useState} from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {auth} from '../firebaseConfig'
import logo from '../assets/logo.png';
import image from '../assets/image.png';
import { Link } from 'react-router-dom';
import './login.css';

const Login = () => {
 const [email, setEmail] = useState<string>('');
 const [password, setPassword] = useState<string>('');
 const [error, setError] = useState<string|null>('');
 const provider = new GoogleAuthProvider();


 const handleEmailSignIn = async (e: React.FormEvent) => {
   e.preventDefault();
   try {
     await signInWithEmailAndPassword(auth, email, password);
     console.log("User signed in successfully with email and password");
   } catch (err) {
     if (err instanceof Error) {
       console.error("Error during email sign-in:", err.message);
       setError(err.message);
     } else {
       setError("An unexpected error occurred.");
     }
   }
 };

 const handleGoogleSignIn = async () => {
   const provider = new GoogleAuthProvider();
   try {
     await signInWithPopup(auth, provider);
     console.log("User signed in successfully with Google");
   } catch (err) {
     if (err instanceof Error) {
       console.error("Error during Google sign-in:", err.message);
       setError(err.message);
     } else {
       setError("An unexpected error occurred.");
     }
   }
 };

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
                        
                        <Link to="/Register" className="create-account-link">
                            Create Account
                        </Link>
                        <Link to="/Register" className="create-account-link">
                            Forgot Password?
                        </Link>
                    </div>
                    <img src={image} alt="Additional" className="additional-image" />
                </div>
            </div>
        </div>
 );
};


export default Login;
