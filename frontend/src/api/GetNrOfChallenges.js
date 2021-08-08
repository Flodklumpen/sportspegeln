import { useEffect } from "react";
import { selectStoreToken } from "../reducers/storeToken";
import { fetchNrOfChallenges } from "../reducers/getNrOfChallenges";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

/**
 * @return {null}
 */
export function GetNrOfChallenges() {

	const dispatch = useDispatch();
	const { user } = useAuth0();

	const email = user.email;
	const token = useSelector(selectStoreToken);

	useEffect(() => {
		if (token !== "") {
			dispatch(fetchNrOfChallenges(email, token));
		}
	}, [dispatch, email, token]);

	return null;
}
