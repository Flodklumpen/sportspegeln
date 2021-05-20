import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { storeUser } from "../reducers/registerUser";
import { useDispatch } from 'react-redux';
import { updateState } from "../reducers/storeToken";

/**
 * @return {null}
 */
export function RegisterUser() {

	const { user, getAccessTokenSilently } = useAuth0();
	const dispatch = useDispatch();

	useEffect(() => {
		const storeToken = async () => {
      const domain = process.env.REACT_APP_AUTH0_DOMAIN;
			const token = await getAccessTokenSilently({
        audience: `https://${domain}/api/v2/`,
      });
			dispatch(updateState(token));
			return token;
		};
		const token = storeToken();

		dispatch(storeUser(user.email, user.given_name, user.family_name, user.sub, token));
  }, [dispatch, user.email, user.given_name, user.family_name, user.sub, getAccessTokenSilently]);

	return null;
}
