import randomId from '../util/randomId';

export default (state = [], action) => {
	switch (action.type) {
		case 'ADD_ACCOUNT':
			action.payload.id = randomId();
			return state.concat(action.payload);
		case 'REMOVE_ACCOUNT':
			return state.filter(r => r.id !== action.payload);
		case 'REFRESH_ACCOUNTS':
			return action.payload.map(r => {
				r.id = randomId();
				return r;
			});
		default:
			return state;
	}
}