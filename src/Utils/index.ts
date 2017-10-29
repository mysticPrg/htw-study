import { ActionCreator } from 'react-redux-typescript';

import { Action } from '../Actions';

class ActionUtil<T, P> extends ActionCreator<T, P> {} // alias

export function makeActionUtil<P>(type: string): ActionUtil<typeof type, P> {
	return new ActionUtil<typeof type, P>(type);
}

export interface Dispatch {
	(action: Action): void;
}

interface Reducer<S> {
	(state: S, action: Action): S;
}

interface SubReducer<S, P> {
	(state: S, payload: P): S;
}

/* tslint:disable: no-any */
export interface ReduceRule<S> {
	actionUtil: ActionUtil<any, any>;
	reducer: SubReducer<S, any>;
}

export function makeReduceRule<T, P, S>(actionUtil: ActionUtil<T, P>, reducer: SubReducer<S, P>): ReduceRule<S> {
	return { actionUtil, reducer };
}

export function makeReducer<S>(initialState: S, rules: Array<ReduceRule<S>>): Reducer<S> {
	return function (state: S = initialState, action: Action) {
		let nextState: S = state;
		rules.every(rule => {
			if ( rule.actionUtil.type === action.type ) {
				nextState = rule.reducer(state, action.payload);
				return false;
			}
			return true;
		});

		return nextState;
	};
}
