const initialState = {
    orderBy: 'relevant',
};

export default (state = initialState, action) => {
    switch (action.type) {
    case 'SET_FILTERS':
        return { ...state, ...action.payload };
    default:
        return state;
    }
};
