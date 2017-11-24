import * as React from 'react';
import { StyleSheet, css } from 'aphrodite';

const searchImg = require('../Resources/search.png');

interface Props {
	onSearch: (keyword: String) => void;
}

const Styles = StyleSheet.create({
	container: {
		margin: 'auto',
		width: '300px',
		height: '30px',
		marginTop: '25px',
		display: 'flex',
	},

	searchIcon: {
		backgroundImage: `url(${searchImg})`,
		width: '30px',
		height: '100%',
		backgroundSize: '25px',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
	},

	input: {
		marginLeft: '10px',
		width: '230px',
		height: '100%',
		border: 'none',
		outline: 'none',
		boxShadow: '0 5px 15px 0 #979ca7',
		borderRadius: '15px',
		padding: '0 15px',
		fontFamily: 'Jeju gothic',
		'::placeholder': {
			textAlign: 'center',
		}
	}
});

class SearchBox extends React.Component<Props> {
	
	searchElm: HTMLInputElement|null = null;
	
	render() {
		return (
			<div className={css(Styles.container)}>
				<div className={css(Styles.searchIcon)}/>
				<input
					type="search"
					className={css(Styles.input)}
					ref={ref$ => this.searchElm = ref$}
					onChange={this.onSearch}
					placeholder="Search"
				/>
			</div>
		);
	}
	
	private onSearch = () => {
		if ( this.searchElm ) {
			this.props.onSearch(this.searchElm.value);
		}
	}
}

export default SearchBox;
