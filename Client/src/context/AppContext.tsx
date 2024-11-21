import { createContext, useState, useEffect, ReactNode } from "react";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isAuthenticated: boolean;
}

const initialState: UserContextType = {
  user: null,
  setUser: () => {},
  isAuthenticated: false,
};

export const UserContext = createContext<UserContextType>(initialState);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const mappedUser: User = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
        };
        setUser(mappedUser);
      } else {
        setUser(null); 
      }
    });

    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};