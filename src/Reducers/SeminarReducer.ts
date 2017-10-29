import { List } from 'immutable';

import { Seminar, seminarInitialState } from '../Stores';
import { SeminarActionUtil } from '../Actions';
import { makeReduceRule, makeReducer } from '../Utils';

export default makeReducer(seminarInitialState, [
	makeReduceRule(SeminarActionUtil.add, (state, seminarInfo) => {
		const seminars = List(state.seminars)
		.push(seminarInfo)
		.toArray();

		return {
			...state,
			seminars
		};
	}),

	makeReduceRule(SeminarActionUtil.del, (state, id) => {
		const seminars = List(state.seminars)
			.filterNot((s: Seminar) => s.id === id)
			.toArray();

		return {
			...state,
			seminars
		};
	}),
]);
