import React, {useState} from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {auth} from '../firebaseConfig'


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
   <div className="flex justify-center items-center h-screen bg-yellow-500 text-white">
     <h1 className="text-4xl font-bold">Login Page</h1>
   </div>
 );
};


export default Login;