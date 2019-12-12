const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
    case 'SET_USER_SCHEDULE':
        return action.payload;
    default:
        return state;
    }
};
