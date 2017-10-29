// libs
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

// modules
import './index.css';
import App from './Components/App';
import rootReducer from './Reducers';
import rootSaga from './Sagas';
import { SystemAction } from './Actions';

import registerServiceWorker from './registerServiceWorker';

// Setting Store and Middlewares
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(sagaMiddleware))
);

// Render App
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root') as HTMLElement
);
registerServiceWorker();
sagaMiddleware.run(rootSaga);

// Init system
store.dispatch(SystemAction.init.create({}));
