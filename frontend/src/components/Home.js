import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { CreateTournament } from "./tournament/CreateTournament";
import { Tournaments } from "./tournament/Tournaments";

export function Home() {

	const { isAuthenticated } = useAuth0();

	return (
      <div>
        <CreateTournament authenticated={isAuthenticated}/>
        <Tournaments />
      </div>
    );
}

export default Home;
