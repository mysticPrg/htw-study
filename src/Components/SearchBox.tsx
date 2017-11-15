import * as React from 'react';

interface Props {
	onSearch: (keyword: String) => void;
}

class SearchBox extends React.Component<Props> {
	
	searchElm: HTMLInputElement|null = null;
	
	render() {
		return (
			<div>
				<input type="search" ref={ref$ => this.searchElm = ref$} onChange={this.onSearch}/>
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