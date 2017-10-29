import { all, takeEvery, put } from 'redux-saga/effects';

import { Action, SeminarActionType, SeminarActionUtil, SystemAction } from '../Actions';

let lastIndex: number = -1;

function* fakeInit() {
	yield takeEvery(SystemAction.INIT, function*(action: Action) {
		for ( let i = 0 ; i < 5 ; i++ ) {
			yield put(SeminarActionUtil.add.create({
				id: ++lastIndex,
				author: `author${lastIndex}`,
				title: `title${lastIndex}`,
				content: `content${lastIndex}`
			}));
		}		
	});
}

function* handleSeminarRefresh() {
	yield takeEvery(SeminarActionType.REFRESH, function*(action: Action) {
		yield put(SeminarActionUtil.add.create({
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
