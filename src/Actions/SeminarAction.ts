import { makeActionUtil } from '../Utils';
import { Seminar } from '../Stores';

export const SeminarAction = {
	add: makeActionUtil<Seminar>('SEMINAR.ADD'),
	del: makeActionUtil<number>('SEMINAR.DELETE'),
	refresh: makeActionUtil('SEMINAR.REFRESH'),
	closeAll: makeActionUtil('SEMINAR.CLOSE_ALL'),
	open: makeActionUtil<number>('SEMINAR.OPEN'),
	closeAndOpen: makeActionUtil<number>('SEMINAR.CLOSE_AND_OPEN'),
	initDone: makeActionUtil('SEMINAR.INIT_DONE'),
};
