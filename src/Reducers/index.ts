import { combineReducers } from 'redux';

import SeminarReducer from './SeminarReducer';

export default combineReducers({
	seminar: SeminarReducer
});