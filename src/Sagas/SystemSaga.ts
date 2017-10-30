import { all, put, take, select } from 'redux-saga/effects';
import { takeEvery } from '../Utils';

import { SeminarAction, SystemAction } from '../Actions';
import RootState from '../Stores';

/* tslint:disable: no-any */
interface Action {
	type: string;
	payload?: any;
}
const lazyActions: Action[] = [];
const initSelector = (state: RootState) => state.system.init;

function* handleInitDone() {
	yield take(SeminarAction.initDone.type);
	yield put(SystemAction.initDone.create());
	
	for ( let i = 0 ; i < lazyActions.length ; i++ ) {
		yield put(lazyActions[i]);
	}
}

function* handleHashChanged() {
	
	yield takeEvery(SystemAction.hashChanged, function*(hash: string) {
		const init = yield select(initSelector);
		if ( init ) {
			console.log('hashChanged!: ', hash);
			const seminarID = Number.parseInt(hash.replace('#', ''));
			yield put(SeminarAction.closeAndOpen.create(seminarID));
		} else {
			lazyActions.push({
				type: SystemAction.hashChanged.type,
				payload: hash
			});
		}
	});
}

export default function*() {
	yield all([
		handleInitDone(),
		handleHashChanged(),
	]);
}
