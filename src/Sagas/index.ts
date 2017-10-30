import { all } from 'redux-saga/effects';

import SeminarSaga from './SeminarSaga';
import SystemSaga from './SystemSaga';

export default function* rootSaga() {
	yield all([
		SystemSaga(),
		SeminarSaga(),
	]);
}
