import * as React from 'react';
import { StyleSheet, css } from 'aphrodite';

import SearchContainer from '../Containers/SearchContainer';
const bg = require('../Resources/header_bg.jpg');
const logo = require('../Resources/logo.png');

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
		boxShadow: '0 5px 15px 0px #0000002b',
	},

	title: {
		color: '#FFFFFF',
		fontSize: '50pt',
		fontWeight: 900,
		margin: 'auto',
		outline: '1px solid #FFFFFF',
		padding: '25px',
		display: 'flex',
		backgroundColor: '#e4e4e48c',
		outlineOffset: '10px',
	},

	logo: {
		margin: 'auto',
	}
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
				{/* <div className={css(styles.title)}>{this.props.title}</div> */}
				<div className={css(styles.title)}>
					<img src={logo} className={css(styles.logo)} />
				</div>
				<SearchContainer />
			</div>
		);
	}
}

export default Header;
