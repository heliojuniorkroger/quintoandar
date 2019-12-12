import React, { useState } from 'react';
import {
    ScrollView,
    View,
    Text,
    Image,
    Platform,
    TouchableOpacity,
    Share,
} from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { useSelector } from 'react-redux';
import currencyFormatter from 'currency-formatter';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import {
    BACKGROUND_COLOR,
    TEXT_COLOR,
    MUTED_TEXT_COLOR,
} from '../../constants';
import Button from '../../components/Button';
import UserService from '../../services/UserService';
import BottomBar from '../../components/BottomBar';
import Pagination from './Pagination';

const FavoriteButton = styled.TouchableOpacity`
    background-color: #fefeff;
    margin-top: 5;
    padding-left: 15;
    padding-right: 15;
    padding-top: 7;
    padding-bottom: 7;
    border-radius: 7;
`;

const SwiperHeader = styled.View`
    flex-direction: row;
    position: absolute;
    align-items: center;
    width: 100%;
    padding-left: 15;
    padding-right: 15;
    justify-content: space-between;
    top: ${Platform.select({ ios: getStatusBarHeight(), android: 15 })};
`;

const Title = styled.Text`
    color: ${({ darkModeContext }) => TEXT_COLOR[darkModeContext]};
    font-weight: bold;
    font-size: 20;
    padding-bottom: 3;
`;

const PropertyDetails = ({ navigation }) => {
    const [ swiperWidth, setSwiperWidth ] = useState(0);
    const darkModeContext = useSelector((store) => store.darkModeContext);
    const user = useSelector(((store) => store.user));
    const savedProperties = useSelector(((store) => store.savedProperties));

    const {
        id, photos, address, rooms, area, fullPrice,
    } = navigation.getParam('property');
    const isSaved = !!savedProperties.find((property) => property.id === id);

    const fullPriceFormatted = currencyFormatter.format(fullPrice, { code: 'BRL' });
    const roomsFormatted = `${rooms} dorm${rooms > 1 ? 's' : ''}`;
    const [ formattedAddress ] = address.split(' - ');

    const saveProperty = async () => {
        if (user) {
            if (isSaved) {
                await UserService.removeProperty(id);
            } else {
                await UserService.saveProperty(id);
            }

            const response = await UserService.getSavedProperties();
            UserService.setSavedProperties(response.data);
        } else {
            navigation.navigate('Sign');
        }
    };

    const shareProperty = () => {
        Share.share({ message: '...' });
    };

    const title = `Lugar com ${roomsFormatted}, ${area}m²`;

    return (
        <>
            <ScrollView style={{ height: '100%', backgroundColor: BACKGROUND_COLOR[darkModeContext] }}>
                <View
                    onLayout={(event) => setSwiperWidth(event.nativeEvent.layout.width)}
                    style={{ height: 250, width: '100%' }}
                >
                    <SwiperFlatList
                        showPagination
                        PaginationComponent={Pagination}
                    >
                        {photos.map((photo, i) => (
                            <Image key={i} source={{ uri: photo }} style={{ height: '100%', width: swiperWidth }} />
                        ))}
                    </SwiperFlatList>
                    <SwiperHeader>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()}>
                            <FontAwesomeIcon name="chevron-left" size={23} color="#fff" />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            <FavoriteButton
                                activeOpacity={0.7}
                                onPress={saveProperty}
                            >
                                <Text style={{ color: 'rgba(0, 0, 0, 0.9)' }}>{isSaved ? 'Favoritado' : 'Favoritar'}</Text>
                            </FavoriteButton>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={shareProperty}
                                style={{ marginLeft: 5 }}
                            >
                                <EvilIcon name="share-apple" size={32} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </SwiperHeader>
                </View>
                <View style={{ padding: 15 }}>
                    <Title darkModeContext={darkModeContext}>
                        {title}
                    </Title>
                    <Text style={{ color: MUTED_TEXT_COLOR[darkModeContext] }}>
                        {formattedAddress}
                    </Text>
                </View>
            </ScrollView>
            <BottomBar>
                <>
                    <View>
                        <Text
                            style={{ color: TEXT_COLOR[darkModeContext], paddingBottom: 3 }}
                        >
                            Valor Total
                        </Text>
                        <Text style={{ color: TEXT_COLOR[darkModeContext], fontWeight: '600' }}>{fullPriceFormatted}</Text>
                    </View>
                    <Button
                        title="Agendar visita"
                        size="lg"
                        onPress={() => navigation.navigate('PropertySchedule', { propertyId: id })}
                    />
                </>
            </BottomBar>
        </>
    );
};

PropertyDetails.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
        getParam: PropTypes.func.isRequired,
        goBack: PropTypes.func.isRequired,
    }).isRequired,
};

export default PropertyDetails;
