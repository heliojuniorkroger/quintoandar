import React, { useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from 'react-navigation-hooks';
import UserService from '../../services/UserService';
import { BACKGROUND_COLOR, TEXT_COLOR, MUTED_TEXT_COLOR } from '../../constants';
import Button from '../../components/Button';
import DetailedProperty from '../../components/DetailedProperty';

const Title = styled.Text`
    color: ${({ darkModeContext }) => TEXT_COLOR[darkModeContext]};
    font-weight: bold;
    margin-bottom: 10;
`;

const Description = styled.Text`
    color: ${({ darkModeContext }) => MUTED_TEXT_COLOR[darkModeContext]};
    max-width: 350;
    text-align: center;
    margin-bottom: 15;
`;

const UserSchedule = () => {
    const schedule = useSelector((store) => store.userSchedule);
    const darkModeContext = useSelector((store) => store.darkModeContext);
    const navigation = useNavigation();

    const getUserSchedule = async () => {
        const response = await UserService.getSchedule();
        UserService.setSchedule(response.data);
    };

    useEffect(() => {
        getUserSchedule();
    }, []);

    const renderContent = () => {
        if (!schedule.length) {
            return (
                <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name="ios-calendar" color={TEXT_COLOR[darkModeContext]} size={35} style={{ marginBottom: 5 }} />
                    <Title darkModeContext={darkModeContext}>
                        Você não tem visitas agendadas
                    </Title>
                    <Description darkModeContext={darkModeContext}>
                        Você ainda não agendou nenhuma visita ou os imóveis visitados já não estão mais disponíveis.
                    </Description>
                    <Button title="Buscar imóveis" onPress={() => navigation.navigate('Properties')} />
                </View>
            );
        }
        return (
            <ScrollView style={{ height: '100%' }} contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 7.5 }}>
                {schedule.map((visit) => (
                    <DetailedProperty key={visit.id} visit={visit} />
                ))}
            </ScrollView>
        );
    };

    return (
        <>
            <View style={{ height: '100%', backgroundColor: BACKGROUND_COLOR[darkModeContext] }}>
                {renderContent()}
            </View>
        </>
    );
};

export default UserSchedule;
