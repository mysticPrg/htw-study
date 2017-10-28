import { ActionCreator } from 'react-redux-typescript';

export function makeActionCreator<P>(type: string): ActionCreator<typeof type, P> {
	return new ActionCreator<typeof type, P>(type);
}

export interface Action {
	type: string;
	payload: Object;
}

export interface Dispatch {
	(action: Action): void;
}