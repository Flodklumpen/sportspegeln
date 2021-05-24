import React from 'react';

//import logo from './logo.svg';
import { Menu } from "./components/Menu";
//import { Counter } from './features/counter/Counter';
import './css/App.css';
import { useAuth0 } from "@auth0/auth0-react";
import { w3cwebsocket } from "websocket";

function App() {

  const { user, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
  	// This could probably be combined with the useEffect below but keeping
  	// them separate for now
  	const socket = new w3cwebsocket("ws://localhost:5000/ws/api");
  	socket.onopen = () => {
  		socket.send(JSON.stringify({email: user.email}));
  		console.log(socket);
  	};

    socket.onmessage = (e) => {
      console.log('Server: ' + e.data);
      let instructions = JSON.parse(e.data);
      if (instructions.type === "message") {
        alert(instructions.data);
      }
    };
  }

  return (
    <div className="App">
      {/*<nav className="App-nav">*/}
      <nav className="App-nav">
        <Menu />
      </nav>
    </div>
  );
}

export default App;
