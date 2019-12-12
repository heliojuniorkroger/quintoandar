import { eventEmitter } from 'react-native-dark-mode';
import store from '../store';

export default class DarkModeService {
    static listen() {
        eventEmitter.on('currentModeChanged', (mode) => {
            store.dispatch({ type: 'SET_DARK_MODE_CONTEXT', payload: mode });
        });
    }
}
