import * as React from 'react';
import { connect } from 'react-redux';

import SearchBox from '../Components/SearchBox';
import { SeminarAction } from '../Actions';
import { Dispatch } from '../Utils';

interface Props {
	readonly onSearch: (keyword: string) => void;
}

class SearchContainer extends React.Component<Props> {
	render() {
		return <SearchBox onSearch={this.props.onSearch} />;
	}
}

const actionToProps = (dispatch: Dispatch) => ({
	onSearch: (keyword: string) => dispatch(SeminarAction.search.create(keyword)),
});

export default connect(null, actionToProps)(SearchContainer);