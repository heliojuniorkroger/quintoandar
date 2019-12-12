import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Property from '../../components/Property';
import Button from '../../components/Button';
import { BACKGROUND_COLOR, TEXT_COLOR, MUTED_TEXT_COLOR } from '../../constants';
import UserService from '../../services/UserService';

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

const SavedProperties = ({ navigation }) => {
    const darkModeContext = useSelector((store) => store.darkModeContext);
    const savedProperties = useSelector((store) => store.savedProperties);

    const getSavedProperties = async () => {
        const response = await UserService.getSavedProperties();
        UserService.setSavedProperties(response.data);
    };

    useEffect(() => {
        getSavedProperties();
    }, []);

    const renderContent = () => {
        if (savedProperties.length) {
            return (
                <ScrollView style={{ height: '100%' }} contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 7.5 }}>
                    {savedProperties.map((property) => (
                        <Property key={property.id} property={property} />
                    ))}
                </ScrollView>
            );
        }
        return (
            <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Icon name="ios-heart-empty" color={TEXT_COLOR[darkModeContext]} size={35} style={{ marginBottom: 5 }} />
                <Title darkModeContext={darkModeContext}>
                    Você não possui favoritos
                </Title>
                <Description darkModeContext={darkModeContext}>
                    Você ainda não favoritou imóveis. Seus imóveis favoritos aparecerão aqui.
                </Description>
                <Button title="Buscar imóveis" onPress={() => navigation.navigate('Properties')} />
            </View>
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

SavedProperties.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired,
};

export default SavedProperties;
