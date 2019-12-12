import React from 'react';
import {
    SafeAreaView, ScrollView, Text,
} from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from 'react-navigation-hooks';
import SearchBox from './SearchBox';
import Property from '../../components/Property';
import {
    BORDER_COLOR, BACKGROUND_COLOR, MUTED_TEXT_COLOR, TEXT_COLOR, CRITERIAS,
} from '../../constants';

const SearchBoxWrapper = styled.View`
    border-bottom-width: 1;
    border-bottom-color: ${({ darkModeContext }) => BORDER_COLOR[darkModeContext]};
    background-color: ${({ darkModeContext }) => BACKGROUND_COLOR[darkModeContext]};
    padding-top: 15;
    padding-left: 15;
    padding-right: 15;
`;

const OrderBy = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    height: 40;
    align-self: flex-end;
`;

const OrderByCriteria = styled.Text`
    color: ${({ darkModeContext }) => MUTED_TEXT_COLOR[darkModeContext]};
    font-size: 13;
    font-weight: 700;
    padding-left: 5;
    padding-right: 10;
`;

const PropertiesList = () => {
    const darkModeContext = useSelector((store) => store.darkModeContext);
    const properties = useSelector((store) => store.properties);
    const filters = useSelector((store) => store.filters);

    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ height: '100%', backgroundColor: BACKGROUND_COLOR[darkModeContext] }}>
            <SearchBoxWrapper darkModeContext={darkModeContext}>
                <SearchBox />
                <OrderBy activeOpacity={1} onPress={() => navigation.navigate('PropertiesOrderBy')}>
                    <Text style={{ color: MUTED_TEXT_COLOR[darkModeContext], fontSize: 12 }}>
                        Ordenar por:
                    </Text>
                    <OrderByCriteria darkModeContext={darkModeContext}>
                        {CRITERIAS[filters.orderBy].toLowerCase()}
                    </OrderByCriteria>
                    <Icon name="ios-arrow-down" color={TEXT_COLOR[darkModeContext]} size={16} />
                </OrderBy>
            </SearchBoxWrapper>
            <ScrollView
                style={{ height: '100%' }}
                contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 7.5 }}
            >
                {properties.map((property) => <Property key={property.id} property={property} />)}
            </ScrollView>
        </SafeAreaView>
    );
};

export default PropertiesList;
