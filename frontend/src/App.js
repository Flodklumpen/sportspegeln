import React from 'react';

//import logo from './logo.svg';
import { Menu } from "./components/menu/Menu";
//import { Counter } from './features/counter/Counter';
import './App.css';
import { Auth0Provider } from "@auth0/auth0-react";

function App() {
  //if (!navigator.userAgent.includes('jsdom')) {
    return (
      <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
      >
        <div className="App">
          <nav className="App-nav">
            <Menu />
          </nav>
        </div>
      </Auth0Provider>
    );
  /*} else {
    return (
      <div>Do not use auth0</div>
    );
  }*/

        /*
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit brah <code>src/App.js</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
      <Profile />
    </div>
    */
  );
}

export default App;
