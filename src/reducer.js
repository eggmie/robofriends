export const CHANGE_SEARCH_FIELD = 'CHANGE_SEARCH_FIELD';

const intialState = {
	searchField: ''
}

export const searchRobots = (state=intialState, action={}) => {
	console.log('action.type', action.type);
	switch(action.type) {
		case CHANGE_SEARCH_FIELD:
			return Object.assign({}, state, {searchField: action.payload});
		default:
			return state;
	}
};