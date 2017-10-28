import { ActionCreator } from 'react-redux-typescript';

import { Seminar } from '../Models';

export enum SeminarAction {
	ADD = 'SEMINAR.ADD',
	DEL = 'SEMINAR.DEL'
}

export const SeminarCreator = {
	add: new ActionCreator<SeminarAction.ADD, Seminar>(SeminarAction.ADD),
	del: new ActionCreator<SeminarAction.DEL, number>(SeminarAction.DEL),
};

// let l = SeminarCreator.load.create({ title: 'title', content: 'content'});
// let d = SeminarCreator.del.create(30);

// {
// 	type: 'SEMINAR.ADD',
// 	payload: {
// 		id: 0,
// 		title: 'title1',
// 		content: 'content1',
// 		author: 'mysticPrg'
// 	}
// }