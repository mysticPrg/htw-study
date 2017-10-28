import { makeActionCreator } from '../Utils';
import { Seminar } from '../Models';

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

// let l = SeminarCreator.load.create({ title: 'title', content: 'content'});
// let d = SeminarCreator.del.create(30);

// SeminarCreator.add.create({
// 	id: 0,
// 	author: '',
// 	content: '',
// 	title: ''
// });

// {
// 	type: 'SEMINAR.ADD',
// 	payload: {
// 		id: 0,
// 		title: 'title1',
// 		content: 'content1',
// 		author: 'mysticPrg'
// 	}
// }