import AsyncStorage from '@react-native-community/async-storage';
import store from '../store';
import ApiService from './ApiService';

export default class UserService {
    static authenticate(code) {
        return ApiService.call('/authentication/ak', 'POST', { code });
    }

    static me() {
        return ApiService.callAuthenticated('/users/me', 'GET');
    }

    static getSchedule() {
        return ApiService.callAuthenticated('/users/schedule', 'GET');
    }

    static saveProperty(propertyId) {
        return ApiService.callAuthenticated('/users/properties', 'POST', { propertyId });
    }

    static removeProperty(propertyId) {
        return ApiService.callAuthenticated(`/users/properties/${propertyId}`, 'DELETE');
    }

    static getSavedProperties() {
        return ApiService.callAuthenticated('/users/properties', 'GET');
    }

    static setSavedProperties(savedProperties) {
        store.dispatch({ type: 'SET_SAVED_PROPERTIES', payload: savedProperties });
    }

    static setSchedule(schedule) {
        store.dispatch({ type: 'SET_USER_SCHEDULE', payload: schedule });
    }

    static async set(user) {
        await AsyncStorage.setItem('@user', JSON.stringify(user));
        store.dispatch({ type: 'SET_USER', payload: user });
    }

    static async get() {
        const user = await AsyncStorage.getItem('@user');
        return JSON.parse(user);
    }
}
