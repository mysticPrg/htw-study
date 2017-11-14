import * as React from 'react';
import { connect } from 'react-redux';

import RootState, { Seminar } from '../Stores';
import SeminarList from '../Components/SeminarList';

import { SeminarAction, SystemAction } from '../Actions';
import { Dispatch } from '../Utils';

interface Props {
	readonly seminars: Seminar[];
	readonly onRefresh: () => void;
	readonly onOpen: (id: number) => void;
	readonly onCloseAll: () => void;
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
					onOpen={this.props.onOpen}
					onCloseAll={this.props.onCloseAll}
				/>
			</div>
		);
	}
}

const stateToProps = (state: RootState) => ({
	seminars: state.seminar.showList
});

const actionToProps = (dispatch: Dispatch) => ({
	onRefresh: () => dispatch(SeminarAction.refresh.create()),
	onOpen: (id: number) => dispatch(SystemAction.hashChangeRequest.create(id.toString())),
	onCloseAll: () => dispatch(SystemAction.hashChangeRequest.create('')),
});

export default connect(stateToProps, actionToProps)(SeminarListContainer);