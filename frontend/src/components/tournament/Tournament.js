import React from 'react';
import { useSelector } from "react-redux";
import { selectTournament } from "./tournamentSlice";

export function Tournament() {

	return (
		<div>
			<p>Här ska turneringen visas</p>
			{ useSelector(selectTournament).tournament_name }
		</div>
	);
}

export default Tournament;
