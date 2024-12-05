import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import image from '../assets/image.png';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>('');
  const navigate = useNavigate();

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in successfully with email and password');
      navigate('/'); // Redirect to decks page
    } catch (err) {
      if (err instanceof Error) {
        console.error('Error during email sign-in:', err.message);
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };
 
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      console.log('User signed in successfully with Google');
      navigate('/');
    } catch (err) {
      if (err instanceof Error) {
        console.error('Error during Google sign-in:', err.message);
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
   <div data-testid="Login" className="grow flex flex-col justify-center h-screen">
            <div className="right-panel pl-52">
                <div className="login-content">
                    <div className="login-container">
                        <h1>Log in</h1>
                        <form onSubmit={handleEmailSignIn}>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-1"></label>
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
                <label htmlFor="password" className="block mb-1"></label>
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
                data-testid="email-login-button"
              >
                Log In
              </button>
            </form>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              data-testid="google-login-button"
            >
              Log In with Google
            </button>                        
                        <Link to="/register" className="create-account-link">
                            Create Account
                        </Link>
                        <Link to="/register" className="create-account-link">
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
