import { localizeReducer } from "react-localize-redux";
import { combineReducers } from "redux";

// -> Own reducers.

export default combineReducers({
	localize              : localizeReducer,
	
});