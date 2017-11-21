import * as React from 'react';

interface Props {
	readonly title: string;
}

class Header extends React.Component<Props> {
	shouldComponentUpdate() {
		return false;
	}
	
	render() {
		return (
			<div id="header">Header: {this.props.title}</div>
		);
	}
}

export default Header;
