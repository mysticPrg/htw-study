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

	makeReduceRule(SeminarAction.closeAll, state => {
		const seminars = List(state.seminars)
			.map((seminar: Seminar) => ({...seminar, isOpen: false}))
			.toArray();

		return {
			...state,
			seminars,
			openCardID: NaN
		};
	}),

	makeReduceRule(SeminarAction.open, (state, id) => {
		const seminars = List(state.seminars)
			.map((seminar: Seminar) => {
				if ( seminar.id === id ) {
					return {
						...seminar,
						isOpen: true
					};
				}
				return seminar;
			})
			.toArray();

		return {
			...state,
			seminars,
			openCardID: id
		};
	}),
]);
