/** Created by github.com/snow-dev: 03/02/20  **/

/** Action types constants definition **/
import axios from '../../helpers/axios/axios';
import { getAuthorizedHeaders } from '../../helpers/axios/axiosHelpers';
import { persistSession } from '../../helpers/sessionHelper';

/** Actions types section definition **/
//-> Login section.
export const START_LOGIN                = 'START_LOGIN';
export const SET_USER_TOKEN             = 'SET_USER_TOKEN';
export const SET_LOGIN_ERROR            = 'SET_LOGIN_ERROR';

/**
 * Generic action creator for start any kind of action.
 * @param type
 * @returns {{type: *}}
 */
export function startLoginProcess(type) {
	return {
		type: type,
	};
}

/**
 * Action creator for set any response into Kstore.
 * @param type
 * @param data
 * @returns {{data: *, type: *}}
 */
export function setLoginResponseToStore(type, data) {
	return {
		type: type,
		data: data,
	};
}

/*********************************************************************************
 **------------------------ ACCESS TOKEN PROFILE SECTION ------------------------*
 *********************************************************************************/

/**
 * Function that request access token to API, on success response we set the user
 * access token on store, on failure, we set the error.
 * @param userData
 * @returns {function(...[*]=)}
 */
export function executeLogin(userData) {
	return function(dispatch) {
		dispatch(startLoginProcess(START_LOGIN));
		// Setup
		let url = '/api/login';
		
		let headers = getAuthorizedHeaders(userData);
		// When
		axios.post(url, headers).then(response => {
			// Then
			console.debug('loginActions: executeLogin <=> Response: ', response.data );
			// Persist access token on local storage.
			persistSession(response.data);
			// Set data on redux store.
			dispatch(setLoginResponseToStore(SET_USER_TOKEN, response.data));
		}).catch(error => {
			console.error('loginActions: executeLogin <=> Response: ', error);
			dispatch(setLoginResponseToStore(SET_LOGIN_ERROR, error));
		});
	};
}