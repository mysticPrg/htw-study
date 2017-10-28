import { makeActionCreator } from '../Utils';

export enum SystemAction {
	INIT = 'SYSTEM.INIT',
}

export const SystemCreator = {
	init: makeActionCreator(SystemAction.INIT),
};
