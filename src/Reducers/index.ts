import { combineReducers } from 'redux';

import SeminarReducer from './SeminarReducer';
import SystemReducer from './SystemReducer';

export default combineReducers({
	seminar: SeminarReducer,
	system: SystemReducer,
});