// Original source: https://usehooks.com/useAuth/

/*
  useAuth hook

  Usage:
    AuthProvider component
      Provider for our authContext
      Wrap the components that will use this hook with <AuthProvider></AuthProvider>

    useAuth hook
        user: Object with the user information returned by the server

        getIsLoggedIn: Function() that will return true if the user is authenticated

        signIn: Function(username, password) that returns a promise to sign in the user

        signUp: Function(username, password, info) that returns a promise to sign up the user. 
                The third parameter is the info object passed to the server, this can contain extra information to save

        signOut: Function that returns a promise to sign out the user

        Every promise returned by this hook will ALWAYS resolve with the response from the server ({error: bool, message: string, data?: any}).

        examples:
          const auth = useAuth();

          auth.getIsLoggedIn();
          auth.signIn("test", "test").then((response) => console.log(response.error, response.message))
*/

/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable spaced-comment */
import React, { useEffect, useContext, createContext } from "react";
import * as API from "lib/API";
import { useSelector, useDispatch } from "react-redux";

const authContext = createContext();

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const user = useSelector((state) => state.UserPrefsModel.user); // Stored user info

  const dispatch = useDispatch();
  const setUserAction = "UserPrefsModel/setUser"; // to be used with dispatch
  const resetPrefsAction = "UserPrefsModel/resetPrefs"; // to be used with dispatch

  // Function to know if the user is authenticated
  const getIsLoggedIn = () => {
    return user != null;
  };

  // Listen for api errors to see if we're still authenticated
  function handleAPIErrors(e) {
    if (e && e.message) {
      // Remove our user info if we're not authenticated
      if (e.message === "NOT_AUTHENTICATED")
        dispatch({ type: setUserAction, payload: null });
    }
  }

  // Manage our API error listener
  useEffect(() => {
    API.addErrorListener(handleAPIErrors);

    return () => API.removeErrorListener(handleAPIErrors);
  }, []);

  // Sign in with username and password
  const signIn = (username, password) => {
    return new Promise((resolve) => {
      API.request("login", { username, password }).then((response) => {
        if (!response.error) {
          dispatch({ type: setUserAction, payload: response.data || {} });
        }

        resolve(response);
      });
    });
  };

  // Sign up with username, password and extra info
  const signUp = (username, password, info) => {
    return new Promise((resolve) => {
      API.request("register", { username, password, ...info }).then(
        (response) => {
          if (!response.error) {
            dispatch({ type: setUserAction, payload: response.data || {} });
          }
          resolve(response);
        }
      );
    });
  };

  // Sign out
  const signOut = () => {
    dispatch({ type: resetPrefsAction, payload: null });
    API.request("logout");
  };

  // TODO: Implement password reset

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

  return {
    user,
    getIsLoggedIn,
    signIn,
    signOut,
    signUp,
    // sendPasswordResetEmail,
    // confirmPasswordReset,
  };
}

// Context provider for auth
export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object
export const useAuth = () => {
  return useContext(authContext);
};
