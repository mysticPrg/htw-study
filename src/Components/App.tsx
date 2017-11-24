import * as React from 'react';

import Header from './Header';
import Footer from './Footer';
import SeminarListContainer from '../Containers/SeminarListContainer';
import HashHandleContainer from '../Containers/HashHandleContainer';
import SearchContainer from '../Containers/SearchContainer';

class App extends React.Component {
	render() {
		return (
			<div>
				<HashHandleContainer />
				<Header title="study.js" />
				<SearchContainer />
				<SeminarListContainer />
				<Footer />
			</div>
		);
	}
}

export default App;