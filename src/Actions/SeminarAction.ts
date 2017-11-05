import { makeActionUtil } from '../Utils';
import { Seminar } from '../Stores';

export const SeminarAction = {
	add: makeActionUtil<Seminar>('SEMINAR.ADD'),
	
	closeAll: makeActionUtil('SEMINAR.CLOSE_ALL'),
	open: makeActionUtil<number>('SEMINAR.OPEN'),
	
	initDone: makeActionUtil('SEMINAR.INIT_DONE'),
	
	refresh: makeActionUtil('SEMINAR.REFRESH'),
};
