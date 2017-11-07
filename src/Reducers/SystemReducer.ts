import { systemInitialState } from '../Stores';
import { SystemAction } from '../Actions';
import { makeReduceRule, makeReducer } from '../Utils';

export default makeReducer(systemInitialState, [
	makeReduceRule(SystemAction.initDone, (state) => {
		return {
			...state,
			init: true
		};
	}),
	
	makeReduceRule(SystemAction.hashChangeRequest, (state, hash) => {
		window.location.hash = `#${hash}`;
		return state;
	}),
]);
