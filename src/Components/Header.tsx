import * as React from 'react';
import { StyleSheet, css } from 'aphrodite';

import SearchContainer from '../Containers/SearchContainer';
const bg = require('../Resources/header_bg.jpg');

const styles = StyleSheet.create({
	header: {
		width: '100%',
		minHeight: '300px',
		backgroundColor: '#ffc800',
		background: `url(${bg})`,
		backgroundSize: 'cover',
		backgroundPositionY: 'center',
		display: 'flex',
		flexDirection: 'column',
	},

	title: {
		color: '#FFFFFF',
		fontSize: '50pt',
		fontWeight: 900,
		margin: 'auto',
		outline: '1px solid #FFFFFF',
		padding: '25px',
	},
});

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
			<div id="header" className={css(styles.header)}>
				<div className={css(styles.title)}>{this.props.title}</div>
				<SearchContainer />
			</div>
		);
	}
}

export default Header;
