import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/Ionicons';
import PropertiesMap from './PropertiesMap';
import PropertiesList from './PropertiesList';
import PropertiesService from '../../services/PropertiesService';
import { PRIMARY_COLOR, BACKGROUND_COLOR, BORDER_COLOR } from '../../constants';

const ViewTypeButton = styled.TouchableOpacity`
    bottom: 15;
    left: 15;
    position: absolute;
    background-color: ${({ darkModeContext }) => BACKGROUND_COLOR[darkModeContext]};
    padding-top: 13;
    padding-bottom: 13;
    padding-left: 10;
    padding-right: 10;
    border-width: 1;
    border-color: ${({ darkModeContext }) => BORDER_COLOR[darkModeContext]};
    border-radius: 8;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const ViewTypeButtonText = styled.Text`
    color: ${({ darkModeContext }) => (
        darkModeContext === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)'
    )};
    font-size: 14;
    font-weight: 500;
`;

const Properties = () => {
    const [ viewType, setViewType ] = useState('list');

    const darkModeContext = useSelector((store) => store.darkModeContext);
    const filters = useSelector((store) => store.filters);

    const searchProperties = () => {
        Geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;

            const response = await PropertiesService.search({
                ...filters,
                latitude,
                longitude,
                distance: '99000000000km',
            });

            PropertiesService.dispatch(response.data);
        }, null, { timeout: 10000, maximumAge: 0 });
    };

    useEffect(() => {
        searchProperties();
    }, [ filters ]);

    const isListViewType = viewType === 'list';

    const toggleViewType = () => {
        setViewType(isListViewType ? 'map' : 'list');
    };

    const renderView = () => {
        if (isListViewType) return <PropertiesList />;
        return <PropertiesMap />;
    };

    useEffect(() => {
        searchProperties();
    }, []);

    return (
        <>
            {renderView()}
            <ViewTypeButton
                activeOpacity={0.7}
                onPress={toggleViewType}
                darkModeContext={darkModeContext}
            >
                <Icon
                    name={isListViewType ? 'ios-map' : 'ios-list'}
                    color={PRIMARY_COLOR}
                    size={19}
                    style={{ paddingRight: 10 }}
                />
                <ViewTypeButtonText darkModeContext={darkModeContext}>
                    {isListViewType ? 'Mapa' : 'Lista'}
                </ViewTypeButtonText>
            </ViewTypeButton>
        </>
    );
};

export default Properties;
