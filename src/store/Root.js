
/** Import react section **/
import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

/** Import translations section section **/
import { addTranslation, initialize, LocalizeProvider } from 'react-localize-redux';
import translations from '../resources/translations/translations.json';

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


const languages = [
	{ name: 'English',    code: 'en' },
	{ name: 'Español',    code: 'es' },
	{ name: 'Portugues',  code: 'pt' },
];

store.dispatch(initialize({
		
		languages,
		options: {
			renderToStaticMarkup: false,
			renderInnerHtml: true,
			defaultLanguage: 'en'
		}
	}
));

store.dispatch(addTranslation(translations));

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
