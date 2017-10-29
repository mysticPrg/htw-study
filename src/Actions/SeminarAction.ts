import { makeActionUtil } from '../Utils';
import { Seminar } from '../Stores';

export enum SeminarActionType {
	ADD = 'SEMINAR.ADD',
	DEL = 'SEMINAR.DEL',
	REFRESH = 'SEMINAR.REFRESH',
}

export const SeminarActionUtil = {
	add: makeActionUtil<Seminar>(SeminarActionType.ADD),
	del: makeActionUtil<number>(SeminarActionType.DEL),
	refresh: makeActionUtil(SeminarActionType.REFRESH),
};
