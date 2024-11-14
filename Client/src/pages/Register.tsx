import React, {useState} from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {auth, db} from '../firebaseConfig'
import {doc, setDoc, getDoc} from 'firebase/firestore'




const Register = () => {
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')
 const [name, setName] = useState('')
 const [error, setError] = useState<string|null>(null)


   const handleRegister = async (e: React.FormEvent) => {
   e.preventDefault();
   try {
     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
     const user = userCredential.user;
     await setDoc(doc(db, "users", user.uid), {
       name: name,
       email: user.email,
       createdAt: new Date(),
       uid: user.uid
     });


     console.log("User registered and data saved to Firestore");
   } catch (err) {
     if (err instanceof Error){
       console.error("Error registering user: ", err.message);
       setError(err.message);
     } else {
       console.error("Unexpected Error, ", err);
       setError("Unexpected Error")
     }


    
   }
 };


 const handleRegisterWithGoogle = async () => {
   const provider = new GoogleAuthProvider();
   try {
     const result = await signInWithPopup(auth, provider);
     const user = result.user;
     const userDocRef = doc(db, "users", user.uid);
     const userSnapshot = await getDoc(userDocRef);
     if (!userSnapshot.exists()) {
       await setDoc(userDocRef, {
         name: user.displayName || "Unnamed",
         email: user.email,
         createdAt: new Date(),
         uid: user.uid
       });
     }
     console.log("User registered with Google and data saved to Firestore");




   } catch (err) {
     if (err instanceof Error) {
       console.error("Error with Google sign-in: ", err.message);
       setError(err.message);
     } else {
       console.error("Unexpected error", err);
       setError("An unexpected error occurred.");
     }
   }
 };
 return (
   <div className="flex justify-center items-center h-screen bg-blue-500 text-white">
     <h1 className="text-4xl font-bold">Register Page</h1>
   </div>
 );
};


export default Register;