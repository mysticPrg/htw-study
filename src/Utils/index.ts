import { takeEvery as _takeEvery } from 'redux-saga/effects';

/* tslint:disable: no-any */
interface Action {
	type: string;
	payload?: any;
}

class ActionUtil<P> {
	readonly type: string;
	readonly payload: P;
	
	constructor(type: string) {
		this.type = type;
	}
	
	create(payload?: P): Action {
		return {
			type: this.type,
			payload
		};
	}
}

export function makeActionUtil<P>(type: string): ActionUtil<P> {
	return new ActionUtil<P>(type);
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

export interface ReduceRule<S> {
	actionUtil: ActionUtil<any>;
	reducer: SubReducer<S, any>;
}

export function makeReduceRule<P, S>(actionUtil: ActionUtil<P>, reducer: SubReducer<S, P>): ReduceRule<S> {
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

interface TakeEveryFn<P> {
	(payload: P): IterableIterator<any>;
}

export function* takeEvery<P>(actionUtil: ActionUtil<P>, fn: TakeEveryFn<P>) {
	return yield _takeEvery(actionUtil.type, function*(action: {type: string, payload: P}) {
		return yield fn(action.payload);
	});
}
