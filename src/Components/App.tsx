import * as React from 'react';

import SeminarListContainer from '../Containers/SeminarListContainer';
import HashHandleContainer from '../Containers/HashHandleContainer';

class App extends React.Component {
	render() {
		return (
			<div>
				<HashHandleContainer />
				<SeminarListContainer />
			</div>
		);
	}
}

export default App;