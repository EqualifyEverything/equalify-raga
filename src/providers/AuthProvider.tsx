import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../../utils/CommonTypes';

type AuthProviderState = {
  user?: User;
  setUser: (user: User) => void;
};

const defaultState: AuthProviderState = {
  user: undefined,
  setUser: () => {},
};

// Create a context for the video provider
const AuthContext = createContext<AuthProviderState>(defaultState);

// Create a video provider component
export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    // this is the initial mount
    console.log('AuthContextProvider mounted');

    // pull the user Object from the chrome-extension storage
    chrome.storage.local.get(['user'], (result) => {
      console.log('Value currently is ', result);
      setUser(result.user);
    });

    return () => {
      // this is the unmount
      console.log('AuthContextProvider unmounted');
    };
  }, []);

  useEffect(() => {
    // user changed
    console.log(`user change: ${JSON.stringify(user, null, 2)}`);
    // store the user Object in the chrome-extension storage
    chrome.storage.local.set({ user });
  }, [user]);

  const authState: AuthProviderState = {
    ...defaultState,
    user,
    setUser,
  };

  // Provide the auth state and any related functions to the children components
  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};

export const useAuthProvider = () => useContext(AuthContext);
