import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { Login } from './components/login/Login';
import './App.css';
import { Auth0Provider } from "@auth0/auth0-react";

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Login />
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
    </div>
  );
}

export default App;
