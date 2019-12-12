import { initialMode } from 'react-native-dark-mode';

const initialState = initialMode;

export default (state = initialState, action) => {
    switch (action.type) {
    case 'SET_DARK_MODE_CONTEXT':
        return action.payload;
    default:
        return state;
    }
};
