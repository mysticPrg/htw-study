import { makeActionUtil } from '../Utils';

export const SystemAction = {
	init: makeActionUtil('SYSTEM.INIT'),
	initDone: makeActionUtil('SYSTEM.INIT_DONE'),
	hashChangeRequest: makeActionUtil<string>('SYSTEM.HASH_CHANGE_REQUEST'),
	hashChanged: makeActionUtil<string>('SYSTEM.HASH_CHANGED'),
};
