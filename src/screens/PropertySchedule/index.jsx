import React, { useEffect, useState } from 'react';
import {
    SafeAreaView, Text, View,
} from 'react-native';
import moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import HapticFeedback from 'react-native-haptic-feedback';
import PropertiesService from '../../services/PropertiesService';
import {
    ACCENT_COLOR,
    TEXT_COLOR,
    BACKGROUND_COLOR,
    MUTED_TEXT_COLOR,
} from '../../constants';
import Button from '../../components/Button';
import BottomBar from '../../components/BottomBar';

const Title = styled.Text`
    text-align: center;
    max-width: 250;
    font-size: 13;
    align-self: center;
    color: ${({ darkModeContext }) => TEXT_COLOR[darkModeContext]};
`;

const DaysContainer = styled.View`
    flex-direction: row;
    justify-content: space-around;
    margin-top: 25;
    margin-bottom: 25;
    padding-left: 25;
    padding-right: 25;
`;

const DayButton = styled.TouchableOpacity`
    align-items: center;
    border-color: ${ACCENT_COLOR};
    border-width: ${({ selected }) => (selected ? 1 : 0)};
    width: 45;
    height: 65;
    border-radius: 35;
    justify-content: center;
`;

const HoursTitle = styled.Text`
    text-align: center;
    max-width: 250;
    font-size: 11;
    align-self: center;
    color: ${({ darkModeContext }) => MUTED_TEXT_COLOR[darkModeContext]};
`;

const HoursContainer = styled.View`
    flex-direction: row;
    margin-top: 25;
    margin-left: auto;
    margin-right: auto;
    flex-wrap: wrap;
    max-width: 240;
`;

const HourButton = styled.TouchableOpacity`
    border-color: ${({ selected }) => (selected ? ACCENT_COLOR : 'transparent')};
    border-width: 1;
    width: 50;
    height: 30;
    margin: 5px;
    border-radius: 35;
    justify-content: center;
    align-items: center;
`;

const PropertySchedule = ({ navigation }) => {
    const [ schedule, setSchedule ] = useState([]);
    const [ selectedDay, setSelecedDay ] = useState(null);
    const [ selectedHour, setSelectedHour ] = useState(null);
    const [ scheduleLoaded, setScheduleLoaded ] = useState(false);

    const darkModeContext = useSelector((store) => store.darkModeContext);
    const propertyId = navigation.getParam('propertyId');

    const getSchedule = async () => {
        const response = await PropertiesService.getSchedule(propertyId);
        const { data } = response;
        setScheduleLoaded(true);
        setSchedule(data);
        const firstAvailableDay = data.find((item) => {
            const hoursWithVisit = data.filter(({ date, visit }) => (
                moment(item.date).isSame(date, 'day') && visit
            ));
            return hoursWithVisit.length < 12;
        });
        if (firstAvailableDay) {
            HapticFeedback.trigger('selection');
            setSelecedDay(firstAvailableDay.date);
        }
    };

    const selectDay = (date) => {
        HapticFeedback.trigger('selection');
        setSelecedDay(date);
        setSelectedHour(null);
    };

    const getDays = () => schedule.reduce((prev, next) => {
        const dateInPrev = prev.find((date) => moment(date).isSame(next.date, 'day'));
        if (dateInPrev) return prev;
        return prev.concat(next.date);
    }, []);

    const getHours = () => schedule.reduce((prev, next) => {
        const isInSelectedDate = moment(selectedDay).isSame(next.date, 'day');
        if (!isInSelectedDate || moment(next.date).isBefore() || next.visit) return prev;
        return prev.concat(next);
    }, []);

    const createVisit = async () => {
        const response = await PropertiesService.createVisit(propertyId, { date: selectedHour });
        navigation.navigate('VisitDetails', { visit: response.data });
    };

    const renderNextButton = () => {
        if (selectedDay && selectedHour) {
            return (
                <BottomBar>
                    <Button title="Continuar" size="full" onPress={() => createVisit()} />
                </BottomBar>
            );
        }
        return null;
    };

    useEffect(() => {
        getSchedule();
    }, []);

    const selectHour = (hour) => {
        HapticFeedback.trigger('selection');
        setSelectedHour(hour);
    };

    const renderHours = () => {
        if (!scheduleLoaded) return null;
        const hours = getHours();
        if (!hours.length) {
            return (
                <Text style={{ color: MUTED_TEXT_COLOR[darkModeContext], fontSize: 13, textAlign: 'center' }}>
                    Nessa data, todos os horários estão ocupados. Por favor, escolha outro dia. 😊
                </Text>
            );
        }
        return hours.map(({ date }, i) => {
            const selected = date === selectedHour;
            return (
                <HourButton
                    key={i}
                    activeOpacity={0.7}
                    onPress={() => selectHour(date)}
                    selected={selected}
                >
                    <Text style={{ color: MUTED_TEXT_COLOR[darkModeContext], fontSize: 13 }}>
                        {moment(date).utc().format('HH:mm')}
                    </Text>
                </HourButton>
            );
        });
    };

    return (
        <SafeAreaView style={{ height: '100%', backgroundColor: BACKGROUND_COLOR[darkModeContext] }}>
            <View style={{ marginTop: 30 }}>
                <Title darkModeContext={darkModeContext}>
                    Para agendar sua visita, escolha um dia e um horário abaixo:
                </Title>
                <DaysContainer>
                    {getDays().map((date, i) => {
                        const selected = date === selectedDay;
                        return (
                            <DayButton
                                key={i}
                                activeOpacity={0.7}
                                onPress={() => selectDay(date)}
                                selected={selected}
                            >
                                <Text style={{ fontSize: 13, color: MUTED_TEXT_COLOR[darkModeContext] }}>
                                    {moment(date).format('ddd')}
                                </Text>
                                <Text style={{ color: TEXT_COLOR[darkModeContext], fontWeight: '600', fontSize: 15 }}>
                                    {moment(date).format('DD')}
                                </Text>
                            </DayButton>
                        );
                    })}
                </DaysContainer>
                <HoursTitle darkModeContext={darkModeContext}>
                    Horários disponíveis
                </HoursTitle>
                <HoursContainer>
                    {renderHours()}
                </HoursContainer>
            </View>
            {renderNextButton()}
        </SafeAreaView>
    );
};

PropertySchedule.propTypes = {
    navigation: PropTypes.shape({
        getParam: PropTypes.func.isRequired,
        navigate: PropTypes.func.isRequired,
    }).isRequired,
};

export default PropertySchedule;
