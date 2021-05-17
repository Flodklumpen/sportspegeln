import React from 'react';
import { CreateTournament } from "../tournaments/features/createTournament/CreateTournament";
import { Tournaments } from "../tournaments/Tournaments";

export function Home() {

	return (
      <div>
        <CreateTournament />
        <Tournaments />
      </div>
    );
}

export default Home;
