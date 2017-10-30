import * as React from 'react';
import { connect } from 'react-redux';

import HashHandler from '../Components/HashHandler';
import { SystemAction } from '../Actions';
import { Dispatch } from '../Utils';

function onHashChanged(dispatch: Dispatch, hash: string) {
	dispatch(SystemAction.hashChanged.create(hash));
}

interface Props {
	readonly onHashChanged: (hash: string) => void;
}

class HashHandleContainer extends React.Component<Props> {
	render() {
		return <HashHandler onHashChanged={this.props.onHashChanged} />;
	}
}

const actionToProps = (dispatch: Dispatch) => ({
	onHashChanged: (hash: string) => onHashChanged(dispatch, hash)
});

export default connect(null, actionToProps)(HashHandleContainer);