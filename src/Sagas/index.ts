import { all } from 'redux-saga/effects';

import SeminarSaga from './SeminarSaga';

export default function* rootSaga() {
	yield all([
		SeminarSaga()
	]);
}
