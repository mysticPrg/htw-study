import * as React from 'react';
import { connect } from 'react-redux';

import RootState, { Seminar } from '../Stores';
import SeminarList from '../Components/SeminarList';

import { SeminarCreator } from '../Actions';
import { Dispatch } from '../Utils';

interface Props {
	readonly seminars: Seminar[];
	readonly onRefresh: () => void;
}

class SeminarListContainer extends React.Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	render() {
		return (
			<div>
				<SeminarList
					seminars={this.props.seminars}
					refresh={this.props.onRefresh}
				/>
			</div>
		);
	}
}

const stateToProps = (state: RootState) => ({
	seminars: state.seminar.seminars
});

const actionToProps = (dispatch: Dispatch) => ({
	onRefresh: () => dispatch(SeminarCreator.refresh.create({}))
});

export default connect(stateToProps, actionToProps)(SeminarListContainer);