import React, { useEffect } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import RNAccountKit from 'react-native-facebook-account-kit';
import { PRIMARY_COLOR } from '../../constants';
import UserService from '../../services/UserService';
import TokenService from '../../services/TokenService';

const Sign = () => {
    const authenticate = async () => {
        RNAccountKit.configure({
            responseType: 'code',
            initialPhoneCountryPrefix: '+55',
            initialPhoneNumber: '31992885016',
            defaultCountry: 'BR',
        });
        const { code } = await RNAccountKit.loginWithPhone();

        let response = await UserService.authenticate(code);
        const { token } = response.data;

        await TokenService.setToken(token);
        response = await UserService.me();

        const user = response.data;
        await UserService.set(user);

        response = await UserService.getSavedProperties();
        UserService.setSavedProperties(response.data);

        response = await UserService.getSchedule();
        UserService.setSchedule(response.data);
    };

    useEffect(() => {
        authenticate();
    }, []);

    return null;
};

Sign.navigationOptions = ({ navigation }) => ({
    headerRight: () => (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
            style={{ paddingHorizontal: 15 }}
        >
            <Text style={{ color: PRIMARY_COLOR, fontSize: 17, fontWeight: '600' }}>Fechar</Text>
        </TouchableOpacity>
    ),
});

export default Sign;
