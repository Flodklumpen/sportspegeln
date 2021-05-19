import React from 'react';
import { CreateTournament } from "./tournament/CreateTournament";
import { Tournaments } from "./tournament/Tournaments";

export function Home() {

	return (
      <div>
        <CreateTournament />
        <Tournaments />
      </div>
    );
}

export default Home;
