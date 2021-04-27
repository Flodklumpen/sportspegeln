import {useAuth0} from "@auth0/auth0-react";
import React from "react";

export function LogInLogOut() {
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
    const { loginWithRedirect } = useAuth0();

    return (
        <button onClick={() => loginWithRedirect()}>Log in</button>
    );
}
export function LogoutButton() {
    const { logout } = useAuth0();

    return (
        <button onClick={() => logout({ returnTo: window.location.origin })}>Log out</button>
    );
}