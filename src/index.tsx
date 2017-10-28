// libs
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

// modules
import SeminarListContainer from './Containers/SeminarListContainer';
import rootReducer from './Reducers';
import rootSaga from './Sagas';

import registerServiceWorker from './registerServiceWorker';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(sagaMiddleware))
);

ReactDOM.render(
	<Provider store={store}>
		<div>
			<SeminarListContainer />
		</div>
	</Provider>,
	document.getElementById('root') as HTMLElement
);
registerServiceWorker();
sagaMiddleware.run(rootSaga);

import { SeminarCreator } from './Actions';
for ( let i = 0 ; i < 5 ; i++ ) {
	store.dispatch(SeminarCreator.add.create({
		id: i,
		author: `author${i}`,
		title: `title${i}`,
		content: `content${i}`,
	}));
}
