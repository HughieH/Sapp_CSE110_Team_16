import React, {useState} from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {auth} from '../firebaseConfig'
import logo from '../assets/logo.png';
import image from '../assets/image.png';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
 const [email, setEmail] = useState<string>('');
 const [password, setPassword] = useState<string>('');
 const [error, setError] = useState<string|null>('');
 const provider = new GoogleAuthProvider();
 const navigate = useNavigate();


 const handleEmailSignIn = async (e: React.FormEvent) => {
   e.preventDefault();
   try {
     await signInWithEmailAndPassword(auth, email, password);
     console.log("User signed in successfully with email and password");
     navigate('/decks'); // Redirect to decks page

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
     navigate('/decks')
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
   <div data-testid="Login" className="grow flex flex-col items-center justify-center min-h-screen">

            <div className="right-panel">
                <div className="login-content">
                    <div className="login-container">
                        <h1>Log in</h1>
                        <form onSubmit={handleEmailSignIn}>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                Log In
              </button>
            </form>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
            >
              Log In with Google
            </button>
                        
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
