import React from 'react';
import {
    TouchableWithoutFeedback, View, Image,
} from 'react-native';
import moment from 'moment';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import currencyFormatter from 'currency-formatter';
import styled from 'styled-components';
import { BORDER_COLOR, TEXT_COLOR, MUTED_TEXT_COLOR } from '../constants';

const Wrapper = styled.View`
    background-color: ${({ darkModeContext }) => (
        darkModeContext === 'light' ? '#fff' : '#1c1c1c'
    )};
    border-radius: 8;
    padding: 15px;
    margin-top: 7.5;
    margin-bottom: 7.5;
    border-width: 1;
    border-color: ${({ darkModeContext }) => BORDER_COLOR[darkModeContext]};
`;

const Address = styled.Text`
    color: ${({ darkModeContext }) => TEXT_COLOR[darkModeContext]};
    font-weight: 600;
    font-size: 13;
    margin-bottom: 5;
`;

const Detail = styled.Text`
    color: ${({ darkModeContext }) => MUTED_TEXT_COLOR[darkModeContext]};
    font-size: 12;
    margin-bottom: 3;
`;

const PhotoWrapper = styled.View`
    height: 90;
    width: 130;
    border-radius: 10;
    overflow: hidden;
`;

const DateWrapper = styled.View`
    border-radius: 7;
    padding-top: 3;
    padding-bottom: 3;
    padding-left: 5;
    padding-right: 5;
    align-self: flex-start;
    margin-bottom: 10;
    background-color: ${({ darkModeContext }) => (
        darkModeContext === 'light' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)'
    )};
`;

const VisitDate = styled.Text`
    color: ${({ darkModeContext }) => TEXT_COLOR[darkModeContext]};
    font-size: 12;
`;

const DetailedProperty = ({ visit }) => {
    const darkModeContext = useSelector((store) => store.darkModeContext);

    const { property, scheduledDate } = visit;

    const {
        photos, price, area, rooms, fullPrice,
    } = property;

    const date = moment(scheduledDate);
    const formattedDate = `${date.format('ddd')}, ${date.format('DD/MM')} às ${date.format('HH:mm')}`;

    const [ firstPhoto ] = photos;

    const addressParts = property.address.split(' - ');
    const formattedAddress = `${addressParts[0]} - ${addressParts[1]}`;

    const formattedRentPrice = currencyFormatter.format(price, { code: 'BRL' });
    const rentPrice = `Aluguel ${formattedRentPrice}`;

    const fullPriceFormatted = `Total ${currencyFormatter.format(fullPrice, { code: 'BRL' })}`;

    const roomsFormatted = `${rooms} dorm${rooms > 1 ? 's' : ''}`;
    const formattedArea = `${area}m²`;

    const details = `${formattedArea} • ${roomsFormatted}`;

    return (
        <TouchableWithoutFeedback>
            <Wrapper darkModeContext={darkModeContext}>
                <DateWrapper darkModeContext={darkModeContext}>
                    <VisitDate darkModeContext={darkModeContext}>{formattedDate}</VisitDate>
                </DateWrapper>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flex: 1 }}>
                        <Address darkModeContext={darkModeContext}>
                            {formattedAddress}
                        </Address>
                        <Detail darkModeContext={darkModeContext}>
                            {rentPrice}
                        </Detail>
                        <Detail darkModeContext={darkModeContext}>
                            {fullPriceFormatted}
                        </Detail>
                        <Detail darkModeContext={darkModeContext}>
                            {details}
                        </Detail>
                    </View>
                    <PhotoWrapper>
                        <Image
                            source={{ uri: firstPhoto }}
                            resizeMode="contain"
                            style={{ width: '100%', height: '100%' }}
                        />
                    </PhotoWrapper>
                </View>
            </Wrapper>
        </TouchableWithoutFeedback>
    );
};

DetailedProperty.propTypes = {
    visit: PropTypes.shape({
        scheduledDate: PropTypes.string.isRequired,
        property: PropTypes.shape({
            address: PropTypes.string.isRequired,
            photos: PropTypes.array.isRequired,
            price: PropTypes.number.isRequired,
            area: PropTypes.number.isRequired,
            rooms: PropTypes.number.isRequired,
            fullPrice: PropTypes.number.isRequired,
        }),
    }).isRequired,
};

export default DetailedProperty;
