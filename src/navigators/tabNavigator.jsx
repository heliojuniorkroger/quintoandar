/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import TabBar from '../components/TabBar';
import Header from '../components/Header';
import Properties from '../screens/Properties';
import SavedProperties from '../screens/SavedProperties';
import UserSchedule from '../screens/UserSchedule';

export default createBottomTabNavigator({
    Properties: {
        screen: Properties,
        navigationOptions: {
            tabBarLabel: 'Busca',
            tabBarIcon: 'ios-search',
        },
    },
    SavedProperties: {
        screen: createStackNavigator({
            SavedProperties: {
                screen: SavedProperties,
                navigationOptions: {
                    title: 'Favoritos',
                    header: (props) => <Header {...props} />,
                },
            },
        }),
        navigationOptions: {
            tabBarLabel: 'Favoritos',
            tabBarIcon: 'ios-heart-empty',
        },
    },
    UserSchedule: {
        screen: createStackNavigator({
            UserSchedule: {
                screen: UserSchedule,
                navigationOptions: {
                    title: 'Visitas',
                    header: (props) => <Header {...props} />,
                },
            },
        }),
        navigationOptions: {
            tabBarLabel: 'Visitas',
            tabBarIcon: 'ios-calendar',
        },
    },
}, {
    tabBarComponent: (props) => <TabBar {...props} />,
});
