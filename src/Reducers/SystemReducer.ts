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
]);
