import axios from 'axios';
import { API_URL } from '../constants';
import TokenService from './TokenService';

export default class ApiService {
    static call(path, method, body) {
        return axios({
            method,
            url: API_URL + path,
            data: body,
        });
    }

    static async callAuthenticated(path, method, body) {
        const token = await TokenService.getToken();

        return axios({
            method,
            url: API_URL + path,
            data: body,
            headers: { 'x-auth-token': token },
        });
    }
}
