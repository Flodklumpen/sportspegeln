import {useAuth0} from "@auth0/auth0-react";
import React from "react";

export function ToggleLogInButton() {
  const { isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return (
      <div>
        <LogoutButton />
      </div>
    );
  } else {
    return (
      <div>
        <LoginButton />
      </div>
    );
  }
}

export function LoginButton() {
  const { loginWithPopup } = useAuth0();

  return (
    <div onClick={() => loginWithPopup()}>Logga in</div>
  );
}
export function LogoutButton() {
  const { logout } = useAuth0();

  return (
    <div onClick={() => logout({ returnTo: window.location.origin })}>Logga ut</div>
  );
}
