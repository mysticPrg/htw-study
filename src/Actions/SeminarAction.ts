import { makeActionUtil } from '../Utils';
import { Seminar } from '../Stores';

export const SeminarAction = {
	add: makeActionUtil<Seminar>('SEMINAR.ADD'),
	
	open: makeActionUtil<number>('SEMINAR.OPEN'),
	closeAll: makeActionUtil('SEMINAR.CLOSE_ALL'),
	
	initDone: makeActionUtil('SEMINAR.INIT_DONE'),
	
	refresh: makeActionUtil('SEMINAR.REFRESH'),
	search: makeActionUtil<string>('SEMINAR.SEARCH'),
};
