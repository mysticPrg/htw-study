import { makeActionUtil } from '../Utils';
import { Seminar } from '../Stores';

export const SeminarAction = {
	add: makeActionUtil<Seminar>('SEMINAR.ADD'),
	del: makeActionUtil<number>('SEMINAR.DELETE'),
	refresh: makeActionUtil('SEMINAR.REFRESH'),
};
