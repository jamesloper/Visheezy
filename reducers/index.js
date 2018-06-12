import { combineReducers } from 'redux';
import accounts from './accounts-reducer';
import pools from './pools-reducer';

export default combineReducers({
	accounts,
	pools,
});