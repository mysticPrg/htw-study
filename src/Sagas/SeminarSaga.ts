import { all, takeEvery, put } from 'redux-saga/effects';

import { Action, SeminarAction, SeminarCreator } from '../Actions';

function* handleSeminarRefresh() {
	yield takeEvery(SeminarAction.REFRESH, function*(action: Action) {
		yield put(SeminarCreator.add.create({
			id: 2,
			author: 'saga author',
			title: 'saga title',
			content: 'saga content'
		}));
	});
}

export default function*() {
	yield all([
		handleSeminarRefresh()
	]);
}
