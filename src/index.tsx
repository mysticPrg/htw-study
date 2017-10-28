// libs
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// modules
import SeminarCard from './Components/SeminarCard';
import reducer from './Reducers';

import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducer, composeWithDevTools());

ReactDOM.render(
	<Provider store={store}>
		<div>
			<SeminarCard
				id={0}
				title="title1"
				author="mysticPrg"
				content="hello?"
			/>
		</div>
	</Provider>,
	document.getElementById('root') as HTMLElement
);
registerServiceWorker();
