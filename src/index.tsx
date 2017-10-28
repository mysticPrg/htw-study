// libs
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// modules
import SeminarListContainer from './Containers/SeminarListContainer';
import reducer from './Reducers';

import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducer, composeWithDevTools());

ReactDOM.render(
	<Provider store={store}>
		<div>
			<SeminarListContainer />
		</div>
	</Provider>,
	document.getElementById('root') as HTMLElement
);
registerServiceWorker();

import { SeminarCreator } from './Actions';
for ( let i = 0 ; i < 5 ; i++ ) {
	store.dispatch(SeminarCreator.add.create({
		id: i,
		author: `author${i}`,
		title: `title${i}`,
		content: `content${i}`,
	}));
}

store.dispatch(SeminarCreator.refresh.create({}));