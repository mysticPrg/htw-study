import { Map, List } from 'immutable';

import { Seminar, seminarInitialState } from '../Stores';
import { SeminarActionUtil } from '../Actions';
import { makeReduceRule, makeReducer } from '../Utils';

export default makeReducer(seminarInitialState, [
	makeReduceRule(SeminarActionUtil.add, (state, seminarInfo) => {
		const seminars: Seminar[] = List(state.seminars)
		.push(Map(seminarInfo).delete('type').toJS())
		.toArray();

		return {
			...state,
			seminars
		};
	}),

	makeReduceRule(SeminarActionUtil.del, (state, id) => {
		const seminars: Seminar[] = List(state.seminars)
			.filterNot((s: Seminar) => s.id === id)
			.toArray();

		return {
			...state,
			seminars
		};
	}),
]);
