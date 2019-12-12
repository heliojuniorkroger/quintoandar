import ApiService from './ApiService';
import store from '../store';

export default class PropertiesService {
    static search(body) {
        return ApiService.call('/properties/search', 'POST', body);
    }

    static getSchedule(propertyId) {
        return ApiService.callAuthenticated(`/properties/${propertyId}/schedule`, 'GET');
    }

    static createVisit(propertyId, body) {
        return ApiService.callAuthenticated(`/properties/${propertyId}/schedule`, 'POST', body);
    }

    static dispatch(properties) {
        store.dispatch({ type: 'SET_PROPERTIES', payload: properties });
    }
}
