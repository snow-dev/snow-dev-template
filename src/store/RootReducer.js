/** Created by github.com/snow-dev: 02/02/20 - titor **/

import { localizeReducer } from "react-localize-redux";
import { combineReducers } from "redux";

// -> Own reducers.
import loginReducer from './login/loginReduer';

export default combineReducers({
	localize              : localizeReducer,
	session               : loginReducer,
});