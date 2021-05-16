import React from 'react';
import { CreateTournament } from "../tournament/CreateTournament";
import { TournamentList } from "../tournament/TournamentList";

export function Home() {

	return (
      <div>
        <CreateTournament />
        <TournamentList />
      </div>
    );
}

export default Home;
