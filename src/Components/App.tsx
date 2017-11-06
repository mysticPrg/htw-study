import * as React from 'react';

import Header from './Header';
import Footer from './Footer';
import SeminarListContainer from '../Containers/SeminarListContainer';
import HashHandleContainer from '../Containers/HashHandleContainer';

class App extends React.Component {
	render() {
		return (
			<div>
				<Header title="study.js" />
				<HashHandleContainer />
				<SeminarListContainer />
				<Footer />
			</div>
		);
	}
}

export default App;