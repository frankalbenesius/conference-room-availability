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
    return <button onClick={handleSignOut}>Sign Out</button>;
  } else {
    return <button onClick={handleSignIn}>Sign In</button>;
  }
}

export default AuthButton;
