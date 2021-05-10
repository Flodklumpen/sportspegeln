import React from 'react';
import { useSelector } from 'react-redux'

export function GetUserData() {

	const currentState = useSelector((state) => state);
	//console.log("currant state: ", currentState.userData);
	const cState = currentState.userData;

	return (
		<div>
			<p>hej { cState['email'] } </p>
		</div>
	);
}