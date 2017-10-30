import { all, put } from 'redux-saga/effects';
import { takeEvery } from '../Utils';

import { SeminarAction, SystemAction } from '../Actions';

let lastIndex: number = -1;

function* fakeInit() {
	yield takeEvery(SystemAction.init, function*() {
		for ( let i = 0 ; i < 5 ; i++ ) {
			yield put(SeminarAction.add.create({
				id: ++lastIndex,
				author: `author${lastIndex}`,
				title: `title${lastIndex}`,
				content: `content${lastIndex}`
			}));
		}
		
		yield put(SeminarAction.initDone.create());
	});
}

function* handleSeminarCloseAndOpen() {
	/* tslint:disable typedef */
	yield takeEvery(SeminarAction.closeAndOpen, function*(ID) {
	/* tslint:enable typedef */
		yield put(SeminarAction.closeAll.create());
		yield put(SeminarAction.open.create(ID));
	});
}

function* handleSeminarRefresh() {
	/* tslint:disable typedef */
	yield takeEvery(SeminarAction.refresh, function*(payload) {
	/* tslint:enable typedef */
		yield put(SeminarAction.add.create({
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
		handleSeminarCloseAndOpen(),
		handleSeminarRefresh()
	]);
}
