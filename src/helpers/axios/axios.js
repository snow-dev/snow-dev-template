/** Created by github.com/snow-dev: 03/02/20 - titor **/

import axios from 'axios';
import asynkstorage from 'asynkstorage';

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.timeout = 10000;
axios.defaults.baseURL = process.env.REACT_APP_CORE_API_URL;

/*
 * Token is stored using an object with v as value,
 * t as timestamp and kt as expiration time.
*/
asynkstorage.getItem('access_token').then(accessToken => {
	/**
	 * This conditional validate if accessToken is stored
	 * and sets in axios defaults headers.
	 */
	if (accessToken) {
		try {
			// const token = JSON.parse(accessToken);
			if (accessToken){
				axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
				axios.defaults.headers.common['mode'] = 'cors';
			} else {
				axios.defaults.headers.common['Content-Type'] = `application/json`;
				axios.defaults.headers.common['crossdomain'] = true;
			}
		}
		catch (error) {
			axios.defaults.headers.common['Content-Type'] = `application/json`;
			console.debug("axiosHelper: There is an inconsistent session");
		}
	} else {
		console.warn("axiosHelper: Not exist session.");
	}
}).catch(() => {
	console.warn("axiosHelper: Something really bad has occurred, please contact the nearest wizard, son as possible");
});


/**
 * Capture axios exceptions and reports into Sentry.op
 */
axios.interceptors.response.use(null, function(error) {
	console.warn("axiosHelper: Please call the wizard for implement sentry configurations.");
});

// Set the AUTH token for any request
axios.interceptors.request.use(async function(config) {
	const token = await localStorage.getItem('access_token');
	config.headers.Authorization =  token ? `Bearer ${token}` : '';
	return config;
});

export default axios;