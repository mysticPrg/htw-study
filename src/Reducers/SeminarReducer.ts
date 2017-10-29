import { List } from 'immutable';

import { Seminar, seminarInitialState } from '../Stores';
import { SeminarAction } from '../Actions';
import { makeReduceRule, makeReducer } from '../Utils';

export default makeReducer(seminarInitialState, [
	makeReduceRule(SeminarAction.add, (state, seminarInfo) => {
		const seminars = List(state.seminars)
		.push(seminarInfo)
		.toArray();

		return {
			...state,
			seminars
		};
	}),

	makeReduceRule(SeminarAction.del, (state, id) => {
		const seminars = List(state.seminars)
			.filterNot((s: Seminar) => s.id === id)
			.toArray();

		return {
			...state,
			seminars
		};
	}),
]);
