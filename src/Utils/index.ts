import { ActionCreator } from 'react-redux-typescript';

export function makeActionCreator<P>(type: string): ActionCreator<typeof type, P> {
	return new ActionCreator<typeof type, P>(type);
}

export function makeEmptyActionCreator(type: string): ActionCreator<typeof type, void> {
	const ac = new ActionCreator<typeof type, void>(type);
	ac.create = () => ({
		type,
		payload: undefined
	});
	return ac;
}