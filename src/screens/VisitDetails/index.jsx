import React from 'react';
import {
    TouchableOpacity, View, Text, Image,
} from 'react-native';
import moment from 'moment';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    BACKGROUND_COLOR, PRIMARY_COLOR, ACCENT_COLOR, TEXT_COLOR,
} from '../../constants';
import Button from '../../components/Button';
import calendar from '../../../assets/images/calendar.png';

const Item = styled.View`
    align-items: center;
    flex-direction: row;
    margin-top: 25;
`;

const ItemIcon = styled.View`
    width: 25;
    height: 25;
    align-items: center;
`;

const ItemText = styled.Text`
    padding-left: 10;
    font-size: 13;
    flex: 1;
    color: ${({ darkModeContext }) => TEXT_COLOR[darkModeContext]};
`;

const VisitDetails = ({ navigation }) => {
    const darkModeContext = useSelector((store) => store.darkModeContext);

    const visit = navigation.getParam('visit');

    const { address, scheduledDate } = visit.property;

    const date = moment(scheduledDate);
    const formattedDate = `${date.format('dddd')}, ${date.format('DD')} de ${date.format('MMMM').toLowerCase()} às ${date.format('HH:mm')}`;

    const addressParts = address.split(' - ');
    const formattedAddress = `${addressParts[0]} - ${addressParts[1]}`;

    return (
        <View style={{ padding: 15, height: '100%', backgroundColor: BACKGROUND_COLOR[darkModeContext] }}>
            <Image source={calendar} style={{ width: '100%', height: 140 }} resizeMode="contain" />
            <Item>
                <ItemIcon>
                    <Icon name="ios-calendar" color={ACCENT_COLOR} size={25} />
                </ItemIcon>
                <ItemText darkModeContext={darkModeContext}>{formattedDate}</ItemText>
            </Item>
            <Item>
                <ItemIcon>
                    <Icon name="ios-pin" color={ACCENT_COLOR} size={25} />
                </ItemIcon>
                <ItemText darkModeContext={darkModeContext}>{formattedAddress}</ItemText>
            </Item>
            <Item>
                <ItemIcon>
                    <Icon name="ios-finger-print" color={ACCENT_COLOR} size={25} />
                </ItemIcon>
                <ItemText darkModeContext={darkModeContext}>
                    Leve seu documento original com foto, você precisa dele para se identificar na portaria e para o corretor.
                </ItemText>
            </Item>
            <Item>
                <ItemIcon>
                    <Icon name="ios-map" color={ACCENT_COLOR} size={25} />
                </ItemIcon>
                <ItemText darkModeContext={darkModeContext}>
                    Caso não possa ir, cancele a visita. O corretor e o proprietário estão contando com você! 😊
                </ItemText>
            </Item>
            <Button title="Salvar na agenda" size="full" style={{ marginTop: 25 }} />
            <Button
                title="Buscar mais imóveis"
                size="full"
                theme="inverse"
                style={{ marginTop: 10 }}
                onPress={() => navigation.navigate('Properties')}
            />
        </View>
    );
};

VisitDetails.navigationOptions = ({ navigation }) => ({
    headerRight: () => (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
            style={{ paddingHorizontal: 15 }}
        >
            <Text style={{ color: PRIMARY_COLOR, fontSize: 17, fontWeight: '600' }}>OK</Text>
        </TouchableOpacity>
    ),
});

VisitDetails.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
        getParam: PropTypes.func.isRequired,
    }).isRequired,
};

export default VisitDetails;
