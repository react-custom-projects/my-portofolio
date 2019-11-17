// required for babel polyfills
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import { Provider } from 'react-redux';

import configureStore from './js/store/configureStore';
import App from './App';
import './scss/styles.scss';

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<HashRouter>
			<App />
		</HashRouter>
	</Provider>,
	document.getElementById('root')
);
