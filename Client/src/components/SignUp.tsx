import React, {useState} from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../firebaseConfig'

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password);

        return (
            <div>
                <h2>Sign Up</h2>
                <form onSubmit={handleSignUp}>
                    <input 
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                    />
                    <input 
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                    />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        )
    }
}

export default SignUp;