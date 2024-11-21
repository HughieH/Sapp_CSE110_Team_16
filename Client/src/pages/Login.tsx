import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import logo from '../assets/logo.png';
import image from '../assets/image.png';
import { Link } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate(); 

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in successfully with email and password');
      navigate('/profile'); 
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      console.log('User signed in successfully with Google');
      navigate('/profile'); 
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
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
            <form onSubmit={handleEmailSignIn}>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Log In</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            <button onClick={handleGoogleSignIn} className="google-sign-in">
              Sign in with Google
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
