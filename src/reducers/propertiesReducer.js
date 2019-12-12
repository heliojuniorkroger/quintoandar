const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
    case 'SET_PROPERTIES':
        return action.payload;
    default:
        return state;
    }
};
