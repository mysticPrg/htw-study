import { all, takeEvery, put } from 'redux-saga/effects';

import { Action, SeminarAction, SeminarCreator, SystemAction } from '../Actions';

let lastIndex: number = -1;

function* fakeInit() {
	yield takeEvery(SystemAction.INIT, function*(action: Action) {
		for ( let i = 0 ; i < 5 ; i++ ) {
			yield put(SeminarCreator.add.create({
				id: ++lastIndex,
				author: `author${lastIndex}`,
				title: `title${lastIndex}`,
				content: `content${lastIndex}`
			}));
		}		
	});
}

function* handleSeminarRefresh() {
	yield takeEvery(SeminarAction.REFRESH, function*(action: Action) {
		yield put(SeminarCreator.add.create({
			id: ++lastIndex,
			author: `author${lastIndex}`,
			title: `title${lastIndex}`,
			content: `content${lastIndex}`
		}));
	});
}

export default function*() {
	yield all([
		fakeInit(),
		handleSeminarRefresh()
	]);
}
