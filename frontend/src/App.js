import React from 'react';

//import logo from './logo.svg';
import { Menu } from "./components/menu/Menu";
//import { Counter } from './features/counter/Counter';
import './App.css';
import {Auth0Provider} from "@auth0/auth0-react";

function App() {

  return (
    <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
    audience={`https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/`}
    scope=""
    >
      <div className="App">
        {/*<nav className="App-nav">*/}
        <nav className="App-nav">
          <Menu />
        </nav>
      </div>
    </Auth0Provider>
  );
}

export default App;
