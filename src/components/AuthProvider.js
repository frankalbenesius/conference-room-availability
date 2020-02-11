import React, { createContext, useState, useEffect } from "react";
import { GAPI_INIT_OPTS } from "../constants";

export const AuthContext = createContext({
  isSignedIn: false
});

export function AuthProvider(props) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [authIsReady, setAuthIsReady] = useState(false);

  useEffect(() => {
    function initClient() {
      window.gapi.client.init(GAPI_INIT_OPTS).then(
        function() {
          // Signal to component that it can display sign-in and sign-off buttons.
          setAuthIsReady(true);
          // Listen for sign-in state changes.
          window.gapi.auth2.getAuthInstance().isSignedIn.listen(setIsSignedIn);
          // Handle the initial sign-in state.
          setIsSignedIn(window.gapi.auth2.getAuthInstance().isSignedIn.get());
        },
        function(error) {
          console.error(error);
        }
      );
    }

    window.gapi.load("client:auth2", initClient);
  }, [setIsSignedIn]);

  function handleSignIn() {
    window.gapi.auth2.getAuthInstance().signIn();
  }

  function handleSignOut() {
    window.gapi.auth2.getAuthInstance().signOut();
  }

  return (
    <AuthContext.Provider value={{ isSignedIn }}>
      {props.children}
      {authIsReady && (
        <div>
          {isSignedIn ? (
            <button onClick={handleSignOut}>sign out</button>
          ) : (
            <button onClick={handleSignIn}>sign in</button>
          )}
        </div>
      )}
    </AuthContext.Provider>
  );
}
