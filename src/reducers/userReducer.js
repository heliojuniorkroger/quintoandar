const initalState = null;

export default (state = initalState, action) => {
    switch (action.type) {
    case 'SET_USER':
        return action.payload;
    default:
        return state;
    }
};
