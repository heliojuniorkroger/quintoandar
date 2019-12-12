import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import 'moment/locale/pt-br';
import store from './store';
import createRootNavigator from './navigators/createRootNavigator';
import UserService from './services/UserService';
import DarkModeService from './services/DarkModeService';

const App = () => {
    const [ initialRouteName, setInitialRouteName ] = useState(undefined);

    const getSessionsAndDispatch = async () => {
        const user = await UserService.get();
        await UserService.set(user);
        setInitialRouteName(null);

        DarkModeService.listen();

        if (user) {
            let response = await UserService.me();
            await UserService.set(response.data);

            response = await UserService.getSavedProperties();
            UserService.setSavedProperties(response.data);

            response = await UserService.getSchedule();
            UserService.setSchedule(response.data);
        }
    };

    useEffect(() => {
        getSessionsAndDispatch();
    }, []);

    const Navigator = createRootNavigator(initialRouteName);

    return (
        <Provider store={store}>
            <Navigator />
        </Provider>
    );
};

export default App;
