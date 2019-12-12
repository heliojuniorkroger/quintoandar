import React, { useState } from 'react';
import { View, Image, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components';
import currencyFormatter from 'currency-formatter';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigation } from 'react-navigation-hooks';
import SwiperFlatList from 'react-native-swiper-flatlist';
import Icon from 'react-native-vector-icons/FontAwesome';
import UserService from '../../services/UserService';
import { TEXT_COLOR, BORDER_COLOR, MUTED_TEXT_COLOR } from '../../constants';
import Pagination from './Pagination';

const Wrapper = styled.View`
    border-width: 1;
    border-color: ${({ darkModeContext }) => BORDER_COLOR[darkModeContext]};
    border-radius: 10;
    overflow: hidden;
    margin-top: 7.5;
    margin-bottom: 7.5;
`;

const SwiperWrapper = styled.View`
    height: 195;
    background-color: rgba(0, 0, 0, 0.5);
`;

const SaveButton = styled.TouchableOpacity`
  position: absolute;
  right: 15;
  top: 15;
  background-color: ${({ darkModeContext }) => (
        darkModeContext === 'light' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'
    )};
  width: 40;
  height: 40;
  border-radius: 20;
  justify-content: center;
  align-items: center;
`;

const RentPrice = styled.Text`
    font-weight: 500;
    color: ${({ darkModeContext }) => TEXT_COLOR[darkModeContext]};
    padding-bottom: 7;
`;

const Details = styled.Text`
    color: ${({ darkModeContext }) => MUTED_TEXT_COLOR[darkModeContext]};
    font-size: 13;
    font-weight: 400;
    padding-bottom: 3;
`;

const Address = styled.Text`
    color: ${({ darkModeContext }) => MUTED_TEXT_COLOR[darkModeContext]};
    font-size: 13;
    font-weight: 400;
`;

const Property = ({ property }) => {
    const [ swiperWidth, setSwiperWidth ] = useState(0);

    const navigation = useNavigation();

    const darkModeContext = useSelector((store) => store.darkModeContext);
    const savedProperties = useSelector((store) => store.savedProperties);
    const user = useSelector((store) => store.user);

    const {
        id,
        price,
        area,
        rooms,
        address,
        photos,
        fullPrice,
    } = property;
    const isSaved = !!savedProperties.find((savedProperty) => savedProperty.id === id);

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

    const rentPrice = `Aluguel ${currencyFormatter.format(price, { code: 'BRL' })}`;

    const fullPriceFormatted = `Total ${currencyFormatter.format(fullPrice, { code: 'BRL' })}`;
    const roomsFormatted = `${rooms} dorm${rooms > 1 ? 's' : ''}`;
    const formattedArea = `${area}m²`;
    const [ formattedAddress ] = address.split(' - ');

    const details = `${fullPriceFormatted} • ${formattedArea} • ${roomsFormatted}`;

    return (
        <Wrapper darkModeContext={darkModeContext}>
            <SwiperWrapper
                onLayout={(event) => setSwiperWidth(event.nativeEvent.layout.width)}
            >
                <SwiperFlatList
                    showPagination
                    PaginationComponent={Pagination}
                >
                    {photos.map((photo, i) => (
                        <TouchableWithoutFeedback key={i} onPress={() => navigation.navigate('PropertyDetails', { property })}>
                            <Image source={{ uri: photo }} style={{ height: '100%', width: swiperWidth }} />
                        </TouchableWithoutFeedback>
                    ))}
                </SwiperFlatList>
                <SaveButton
                    activeOpacity={0.7}
                    onPress={saveProperty}
                >
                    <Icon name={isSaved ? 'heart' : 'heart-o'} size={20} color="#fff" />
                </SaveButton>
            </SwiperWrapper>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('PropertyDetails', { property })}>
                <View style={{ padding: 10 }}>
                    <RentPrice darkModeContext={darkModeContext}>
                        {rentPrice}
                    </RentPrice>
                    <Details darkModeContext={darkModeContext}>
                        {details}
                    </Details>
                    <Address darkModeContext={darkModeContext}>{formattedAddress}</Address>
                </View>
            </TouchableWithoutFeedback>
        </Wrapper>
    );
};

Property.propTypes = {
    property: PropTypes.shape({
        id: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        fullPrice: PropTypes.number.isRequired,
        area: PropTypes.number.isRequired,
        rooms: PropTypes.number.isRequired,
        address: PropTypes.string.isRequired,
        photos: PropTypes.array.isRequired,
    }).isRequired,
};

export default Property;
