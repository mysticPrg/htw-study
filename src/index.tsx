// libs
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createActionFlow from './Utils/ActionFlow';
import { composeWithDevTools } from 'redux-devtools-extension';

// modules
import './index.css';
import App from './Components/App';
import rootReducer from './Reducers';
import rootFlow from './Flows';
import { SystemAction } from './Actions';

import registerServiceWorker from './registerServiceWorker';

// Setting Store and Middlewares
const actionFlow = createActionFlow();
const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(actionFlow))
);

actionFlow.run(rootFlow);

// Render App
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root') as HTMLElement
);
registerServiceWorker();

// Init system
store.dispatch(SystemAction.init.create());
