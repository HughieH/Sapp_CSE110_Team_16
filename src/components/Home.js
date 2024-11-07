// src/components/Home.js
import React, { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <div>
      {user ? (
        <>
          <h2>User: {user.email}</h2>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <h2>Please log in</h2>
      )}
    </div>
  );
};

export default Home;
