/** Created by github.com/snow-dev: 03/02/20 - titor **/

import { fromJS } from 'immutable';

/** Actions import section **/
import * as loginActions from './loginActions';

/**
 * This is the initial session state.
 * @type {any}
 */
const initialState = fromJS({
	is_requesting       : false,
	finish_login        : false,
	successfully_logged : false,
	has_error           : false,
	error_message       : '',
	access_token        : '',
	user_profile        : {},
});

export default function loginReducer(state = initialState, action) {
	switch (action.type) {
		// case 0: Start login process and turn on flag.
		case loginActions.START_LOGIN: {
			return state.merge({
				is_processing     : true,
			});
		}
		// case 1: Set access token to store.
		case loginActions.SET_USER_TOKEN: {
			return state.merge({
				access_token      : action.data,
			});
		}
		
		// case error: We switch to error state and reset request flags.
		case loginActions.SET_LOGIN_ERROR: {
			return state.merge({
				error_message         : action.data,
				has_error             : true,
				finish_login          : true,
				successfully_logged   : false,
				is_requesting         : false,
			});
		}
		
		// -> Default case.
		default: {
			return state;
		}
	}
}