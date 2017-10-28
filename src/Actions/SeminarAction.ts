import { makeActionCreator } from '../Utils';
import { Seminar } from '../Stores';

export enum SeminarAction {
	ADD = 'SEMINAR.ADD',
	DEL = 'SEMINAR.DEL',
	REFRESH = 'SEMINAR.REFRESH',
}

export const SeminarCreator = {
	add: makeActionCreator<Seminar>(SeminarAction.ADD),
	del: makeActionCreator<number>(SeminarAction.DEL),
	refresh: makeActionCreator(SeminarAction.REFRESH),
};
