import { ActionCreator } from 'react-redux-typescript';

import { Action } from '../Actions';

export function makeActionCreator<P>(type: string): ActionCreator<typeof type, P> {
	return new ActionCreator<typeof type, P>(type);
}

export interface Dispatch {
	(action: Action): void;
}