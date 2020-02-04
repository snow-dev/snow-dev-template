/** Created by github.com/snow-dev: 03/02/20 - titor **/

/**
 * This function help us to compose headers for login action.
 * @param userData - {username, password}
 * @returns {undefined}
 */
export function getAuthorizedHeaders(userData) {
	return {
		'scope'         : '*',
		'grant_type'    : 'password',
		'username'      : userData.username,
		'password'      : userData.password,
	};
}