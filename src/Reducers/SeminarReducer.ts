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
			seminars,
		};
	}),
	
	makeReduceRule(SeminarAction.search, (state, keyword) => {
		let showList;
		if ( keyword === '' ) {
			showList = List(state.seminars).toArray();
		} else {
			showList = List(state.seminars)
				.filter((seminar: Seminar) => {
					const title = (seminar.title.search(keyword) !== -1);
					const author = (seminar.author.search(keyword) !== -1);
					return title || author;
				})
				.toArray();
		}
			
		return {
			...state,
			showList,
		};
	}),

	makeReduceRule(SeminarAction.closeAll, state => {
		const showList = List(state.showList)
			.map((seminar: Seminar) => ({...seminar, isOpen: false}))
			.toArray();

		return {
			...state,
			showList,
			openCardID: NaN
		};
	}),

	makeReduceRule(SeminarAction.open, (state, id) => {
		const showList = List(state.showList)
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
			showList,
			openCardID: id
		};
	}),
]);
