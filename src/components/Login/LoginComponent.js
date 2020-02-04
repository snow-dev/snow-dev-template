/** Created by github.com/snow-dev: 03/02/20 - titor **/

/** Import react section **/
import React from 'react';
import PropTypes from 'prop-types';
import { Translate } from 'react-localize-redux';
//import { Translate } from 'react-localize-redux';

/** Import component section **/

/** Import helpers section **/

/** Import resources section **/

function LoginComponent(props) {
	return (
		<div>
			<h1>Login Component</h1>
			<Translate id="login.isRequesting" />
			{
				props.session.get('is_requesting')
			}
		</div>
	);
}

/**
 * Validate properties that component will need.
 * @type {{}}
 */
LoginComponent.propTypes = {};

export default LoginComponent;