/** Created by github.com/snow-dev: 03/02/20 - titor **/

/** Import react section **/
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

/** Import hooks section **/
import { useDispatch, useSelector } from 'react-redux';

/** Import component section **/
import LoginComponent from './LoginComponent';
import { executeLogin } from '../../store/login/loginActions';

/** Import helpers section **/

/** Import resources section **/

export function LoginContainer() {
	const dispatch = useDispatch();
	const session = useSelector(store => store.session);
	const [ user, setUser ] = useState({});
	
	useEffect(() => {
		dispatch(executeLogin({
				username: 'snow',
				password: 'sesame'
			})
		);
	},[ dispatch ]);
	
	return <LoginComponent session={session} />;
}

/**
 * Validate properties that component will need.
 * @type {{}}
 */
LoginContainer.propTypes = {};

export default LoginContainer;