import React, { useContext } from "react";
import { ApiContext } from "./ApiProvider";

function AuthButton() {
  const { isInitialized, isSignedIn, handleSignIn, handleSignOut } = useContext(
    ApiContext
  );

  if (!isInitialized) {
    return null;
  }

  if (isSignedIn) {
    return <button onClick={handleSignOut}>sign out</button>;
  } else {
    return <button onClick={handleSignIn}>sign in</button>;
  }
}

export default AuthButton;
