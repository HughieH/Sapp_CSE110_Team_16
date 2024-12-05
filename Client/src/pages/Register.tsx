import React, { useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import register from '../assets/register.png';

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, 'users', user.uid), {
        name: name,
        email: user.email,
        createdAt: new Date(),
        uid: user.uid,
      });

      console.log('User registered and data saved to Firestore');
      navigate('/decks');
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes('auth/email-already-in-use')) {
          alert('The email is already in use. Please use a different email.');
        } else {
          alert('An unexpected error occurred. Please try again.');
        }
        console.error('Error registering user: ', err.message);
      }
    }
  };

  const handleRegisterWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userDocRef = doc(db, 'users', user.uid);
      const userSnapshot = await getDoc(userDocRef);
      if (!userSnapshot.exists()) {
        await setDoc(userDocRef, {
          name: user.displayName || 'Unnamed',
          email: user.email,
          createdAt: new Date(),
          uid: user.uid,
        });
      }

      console.log('User registered with Google and data saved to Firestore');
      navigate('/decks');
    } catch (err) {
      if (err instanceof Error) {
        alert('An error occurred during Google sign-in. Please try again.');
        console.error('Error with Google sign-in: ', err.message);
      }
    }
  };

  return (
    <div data-testid="Register" className="grow flex flex-col justify-center h-screen">
      <div className="right-panel pl-52">
        <div className="login-content">
          <div className="login-container">
            <h1>Create Account</h1>
            <form onSubmit={handleRegister}>
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit">Sign up with email</button>
            </form>
            <button type="button" onClick={handleRegisterWithGoogle}>
              Sign up with Google
            </button>

            {/* Link to login page */}
            <div style={{ textAlign: 'center', fontSize: '22px', color: 'white' }}>
              Already signed up? Go to&nbsp;
              <Link to="/login" style={{ color: 'white', textDecoration: 'underline' }}>
                Login
              </Link>
            </div>
          </div>
          <img src={register} alt="Additional" className="additional-image pt-16" />
        </div>
      </div>
    </div>
  );
};

export default Register;
