import { makeActionUtil } from '../Utils';

export enum SystemAction {
	INIT = 'SYSTEM.INIT',
}

export const SystemCreator = {
	init: makeActionUtil(SystemAction.INIT),
};
