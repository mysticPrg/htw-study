import { put, take, fork, select } from 'redux-saga/effects';

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
	while ( true ) {
		const action = yield take(SystemAction.hashChanged.type);
		const hash: typeof SystemAction.hashChanged.payload = action.payload;
		
		const init = yield select(initSelector);
		if ( init ) {
			console.log('hashChanged!: ', hash);
			const seminarID = Number.parseInt(hash.replace('#', ''));
			yield put(SeminarAction.closeAndOpen.create(seminarID));
		} else {
			lazyActions.push(action);
		}
	}
}

export default function*() {
	yield fork(handleHashChanged);
	yield fork(handleInitDone);
	
}
