
/** Import react section **/
import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { LocalizeProvider } from 'react-localize-redux';

/** Import component section **/
import rootReducer from './RootReducer';

/** Import helpers section **/
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';


/**
 * Create store and apply middleware.
 * @type {any}
 */
const store = createStore(rootReducer,
	composeWithDevTools(
		applyMiddleware(thunk),
	)
);

/**
 * Compose and wrap everything within providers.
 * @param props
 * @returns {*}
 */
export default (props) => (
	<Provider store={store}>
		<LocalizeProvider store={store}>
			{ props.children }
		</LocalizeProvider>
	</Provider>
);
