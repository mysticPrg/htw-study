import { Map, List } from 'immutable';

import { Seminar, SeminarState, SeminarInitialState } from '../Stores';
import { SeminarAction, SeminarCreator } from '../Actions';

type Action = typeof SeminarCreator[keyof typeof SeminarCreator];

const SeminarReducer: (state: SeminarState, action: Action) => SeminarState =
	(state = SeminarInitialState, action) => {
		switch ( action.type ) {

			case SeminarAction.ADD: {
				const seminarInfo = action.payload as Seminar;
				const seminars: Seminar[] = List(state.seminars)
					.push(Map(seminarInfo).delete('type').toJS())
					.toArray();

				return {
					...state,
					seminars
				};
			}

			case SeminarAction.DEL: {
				const id = action.payload as number;
				const seminars: Seminar[] = List(state.seminars)
					.filterNot((s: Seminar) => s.id === id)
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
