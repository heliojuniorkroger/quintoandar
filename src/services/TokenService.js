import AsyncStorage from '@react-native-community/async-storage';

export default class TokenService {
    static async setToken(token) {
        await AsyncStorage.setItem('@token', token);
    }

    static getToken() {
        return AsyncStorage.getItem('@token');
    }
}
