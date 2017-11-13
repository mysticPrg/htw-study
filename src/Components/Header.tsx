import * as React from 'react';

// import SearchBox from './SearchBox';
import SearchContainer from '../Containers/SearchContainer';

interface Props {
	readonly title: string;
}

class Header extends React.Component<Props> {
	
	searchElm: HTMLInputElement|null = null;
	
	shouldComponentUpdate() {
		return false;
	}
	
	render() {
		return (
			<div>
				<div>
					Header: {this.props.title}
				</div>
				<SearchContainer />
			</div>
		);
	}
}

export default Header;
