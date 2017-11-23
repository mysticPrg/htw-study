// libs
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createActionFlow from './Utils/ActionFlow';
import { composeWithDevTools } from 'redux-devtools-extension';

// modules
import './Resources/index.css';
import App from './Components/App';
import rootReducer from './Reducers';
import rootFlow from './Flows';
import { SystemAction } from './Actions';

import registerServiceWorker from './registerServiceWorker';

const dev = true;

// Setting Store and Middlewares
const actionFlow = createActionFlow();
let store;

if ( dev ) {
	store = createStore(
		rootReducer,
		composeWithDevTools(applyMiddleware(actionFlow))
	);
} else {
	store = createStore(
		rootReducer,
		applyMiddleware(actionFlow)
	);
}

actionFlow.run(rootFlow);

// Render App
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root') as HTMLElement
);

if ( !dev ) {
	registerServiceWorker();
}

// Init system
store.dispatch(SystemAction.init.create());
