/** Created by github.com/snow-dev: 03/02/20 - titor **/

/**
 * Set user profile on local storage for persistence after refresh action.
 * @param userData
 */
export function persistSession(userData) {
	localStorage.setItem('user_profile', JSON.stringify(userData));
}

/**
 * Here we check if user has an access token and user profile stored en local storage,
 * it is valid ann is okay, we return true else we return false.
 * @returns {boolean}
 */
export function existSession() {
	let accessToken = localStorage.getItem("access_token");
	return accessToken !== null;
}


/**
 * Delete all user data on local storage.
 */
export function finishUserSession() {
	localStorage.removeItem('user_profile');
	localStorage.removeItem('access_token');
}