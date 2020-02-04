
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


/**
 * Here we define our supported languages.
 * @type {(
 * {code: string, name: string}|
 * {code: string, name: string}|
 * {code: string, name: string})
 * []}
 */
const languages = [
	{ name: 'English',    code: 'en' },
	{ name: 'Español',    code: 'es' },
	{ name: 'Portugues',  code: 'pt' },
];

const onMissingTranslation = ({ defaultTranslation }) => defaultTranslation;


/**
 * Once we defined, we need to initialize and pass it to redux store.
 * Then we enable or default language and some properties.
 */
store.dispatch(initialize({
		languages,
		options: {
			renderToStaticMarkup: false,
			renderInnerHtml: true,
			defaultLanguage: 'en',
			onMissingTranslation
		}
	}
));
/**
 * Here we load our translations file
 */
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
