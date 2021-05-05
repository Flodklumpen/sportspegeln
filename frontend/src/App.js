import React from 'react';

//import logo from './logo.svg';
import { Menu } from "./components/menu/Menu";
//import { Counter } from './features/counter/Counter';
import './App.css';
import { Auth0Provider } from "@auth0/auth0-react";

function App() {
  return (
    <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
    redirectUri={window.location.origin}
    >
      <div className="App">
        {/*<nav className="App-nav">*/}
        <nav>
          <Menu />
        </nav>
      </div>
    </Auth0Provider>
  );
}

export default App;
