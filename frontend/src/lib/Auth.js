// Original source: https://usehooks.com/useAuth/

/*
  useAuth hook

  Usage:
    AuthProvider
      ...

    useAuth
      ....
*/

/* eslint-disable */

import React, { useState, useEffect, useContext, createContext } from "react";
import * as API from "lib/API";

const authContext = createContext();

// Context provider for auth
export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);

  function handleAPIErrors(e) {
    if (e && e.message) {
      console.log(e.message);

      if (e.message === "Not authenticated") setUser(null);
    }
  }

  React.useEffect(() => {
    API.addErrorListener(handleAPIErrors);

    () => API.removeErrorListener(handleAPIErrors);
  }, []);

  const signIn = (username, password) => {
    return API.request("login", { username, password })
      .then((response) => {
        const { data, error } = response;

        if (!error && data) {
          setUser(data);
        }

        return response;
      })
      .catch((err) => {
        return err;
      });
  };

  const signUp = (username, password, name) => {
    return API.request("register", { username, password })
      .then((result) => {
        setUser(result.data);
        return result;
      })
      .catch((err) => {
        return err;
      });
  };

  const signOut = () => {
    return API.request("logout", { username, password })
      .then((result) => {
        setUser(false);
        return result;
      })
      .catch((err) => {
        return err;
      });
  };

  /* 
  const sendPasswordResetEmail = (email) => {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        return true;
      });
  };

  const confirmPasswordReset = (code, password) => {
    return firebase
      .auth()
      .confirmPasswordReset(code, password)
      .then(() => {
        return true;
      });
  }; 
  */

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  /* useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });

    return () => unsubscribe();
  }, []); */

  return {
    user,
    signIn,
    signUp,
    signOut,
    // sendPasswordResetEmail,
    // confirmPasswordReset,
  };
}
