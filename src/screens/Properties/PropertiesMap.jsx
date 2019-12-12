import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    View,
    Text,
    SafeAreaView,
} from 'react-native';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/Ionicons';
import { ClusterMap } from 'react-native-cluster-map';
import { Marker } from 'react-native-maps';
import SearchBox from './SearchBox';
import { BACKGROUND_COLOR } from '../../constants';
import FAB from '../../components/FAB';

const ClusterMarker = styled.View`
    width: 60;
    height: 60;
    background-color: #37b47d;
    border-radius: 30;
    justify-content: center;
    align-items: center;
`;

const CustomClusterMarker = ({ count }) => {
    const darkModeContext = useSelector((store) => store.darkModeContext);

    return (
        <ClusterMarker>
            <Text style={{ fontWeight: 'bold', color: BACKGROUND_COLOR[darkModeContext] }}>{count}</Text>
            <Text style={{ fontSize: 12, color: BACKGROUND_COLOR[darkModeContext] }}>imóveis</Text>
        </ClusterMarker>
    );
};

CustomClusterMarker.propTypes = {
    count: PropTypes.number.isRequired,
};

const PropertiesMap = () => {
    const [ initialRegion, setInitialRegion ] = useState(null);
    const mapRef = useRef(null);
    const properties = useSelector((store) => store.properties);

    useEffect(() => {
        Geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            setInitialRegion({ latitude, longitude });
        }, null, { timeout: 10000, maximumAge: 0 });
    }, []);

    const centerLocation = () => {
        Geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;

            mapRef.current.mapRef.animateToRegion({
                latitude,
                longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        }, null, { timeout: 10000, maximumAge: 0 });
    };

    const renderMap = () => {
        if (initialRegion) {
            return (
                <ClusterMap
                    ref={mapRef}
                    region={{
                        latitude: initialRegion.latitude,
                        longitude: initialRegion.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    renderClusterMarker={(count) => <CustomClusterMarker count={count} />}
                >
                    {properties.map((property) => {
                        const [ latitude, longitude ] = property.geometry;

                        return (
                            <Marker
                                key={property.id}
                                coordinate={{ latitude, longitude }}
                            />
                        );
                    })}
                </ClusterMap>
            );
        }
        return null;
    };

    return (
        <>
            {renderMap()}
            <SafeAreaView>
                <View style={{ paddingTop: 15, paddingHorizontal: 15 }}>
                    <SearchBox />
                </View>
            </SafeAreaView>
            <FAB onPress={centerLocation}>
                <Icon name="md-locate" size={15} color="#898a89" />
            </FAB>
        </>
    );
};

export default PropertiesMap;
