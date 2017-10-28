import { Map, List } from 'immutable';

import { Seminar } from '../Stores';
import { SeminarAction, SeminarCreator } from '../Actions';

interface SeminarState {
	seminars: Seminar[];
}

const initialState: SeminarState = {
	seminars: []
};

type Action = typeof SeminarCreator[keyof typeof SeminarCreator];

const SeminarReducer: (state: SeminarState, action: Action) => SeminarState =
	(state = initialState, action) => {
		switch ( action.type ) {

			case SeminarAction.ADD: {
				const seminars: Seminar[] = List(state.seminars)
					.push(Map(action.payload).delete('type').toJS())
					.toArray();

				return {
					...state,
					seminars
				};
			}

			case SeminarAction.DEL: {
				const seminars: Seminar[] = List(state.seminars)
					.filterNot((s: Seminar) => s.id === action.payload)
					.toArray();

				return {
					...state,
					seminars
				};
			}

			case SeminarAction.REFRESH: {
				return state;
			}

			default:
				return state;
		}
};

export default SeminarReducer;