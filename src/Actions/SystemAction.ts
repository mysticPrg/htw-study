import { makeActionUtil } from '../Utils';

export const SystemAction = {
	init: makeActionUtil('SYSTEM.INIT'),
	initDone: makeActionUtil('SYSTEM.INIT_DONE'),
	hashChanged: makeActionUtil<string>('SYSTEM.HASH_CHANGED'),
};
