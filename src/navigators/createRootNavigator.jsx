/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import tabNavigator from './tabNavigator';
import Sign from '../screens/Sign';
import PropertyDetails from '../screens/PropertyDetails';
import PropertySchedule from '../screens/PropertySchedule';
import VisitDetails from '../screens/VisitDetails';
import PropertiesOrderBy from '../screens/PropertiesOrderBy';
import Header from '../components/Header';

export default (initialRouteName) => {
    if (initialRouteName === undefined) return () => null;
    return createAppContainer(createStackNavigator({
        tabNavigator: {
            screen: tabNavigator,
            navigationOptions: {
                header: null,
            },
        },
        Sign: {
            screen: Sign,
            navigationOptions: {
                title: 'Acesse sua conta',
                headerLeft: null,
            },
        },
        PropertyDetails: {
            screen: PropertyDetails,
            navigationOptions: {
                header: null,
            },
        },
        PropertySchedule: {
            screen: PropertySchedule,
            navigationOptions: {
                header: null,
            },
        },
        VisitDetails: {
            screen: VisitDetails,
            navigationOptions: {
                title: 'Você agendou sua visita!',
                headerLeft: null,
            },
        },
        PropertiesOrderBy: {
            screen: PropertiesOrderBy,
            navigationOptions: {
                title: 'Ordenar por',
            },
        },
    }, {
        initialRouteName,
        defaultNavigationOptions: {
            header: (props) => <Header {...props} />,
        },
    }));
};
