import React from 'react';
import { TouchableOpacity, ScrollView, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components';
import { useNavigation } from 'react-navigation-hooks';
import {
    PRIMARY_COLOR, BACKGROUND_COLOR, BORDER_COLOR, TEXT_COLOR, CRITERIAS,
} from '../../constants';

const Item = styled.TouchableOpacity`
    height: 40;
    justify-content: center;
    padding-left: 15;
    padding-right: 15;
    border-bottom-width: 1;
    border-bottom-color: ${({ darkModeContext }) => BORDER_COLOR[darkModeContext]};
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
`;

const PropertiesOrderBy = () => {
    const darkModeContext = useSelector((store) => store.darkModeContext);
    const filters = useSelector((store) => store.filters);
    const navigation = useNavigation();

    const dispatch = useDispatch();

    const set = (key) => {
        dispatch({
            type: 'SET_FILTERS',
            payload: { orderBy: key },
        });
        navigation.goBack();
    };

    return (
        <ScrollView style={{ backgroundColor: BACKGROUND_COLOR[darkModeContext], height: '100%' }}>
            {Object.keys(CRITERIAS).map((key) => {
                const selected = filters.orderBy === key;
                return (
                    <Item
                        key={key}
                        activeOpacity={0.7}
                        darkModeContext={darkModeContext}
                        onPress={() => set(key)}
                    >
                        <Text style={{ color: TEXT_COLOR[darkModeContext] }}>{CRITERIAS[key]}</Text>
                        {selected && <Icon name="ios-checkmark" color={PRIMARY_COLOR} size={27} />}
                    </Item>
                );
            })}
        </ScrollView>
    );
};

PropertiesOrderBy.navigationOptions = ({ navigation }) => ({
    headerLeft: () => (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
            style={{ paddingHorizontal: 15 }}
        >
            <Text style={{ color: PRIMARY_COLOR, fontSize: 17, fontWeight: '600' }}>Cancelar</Text>
        </TouchableOpacity>
    ),
});

export default PropertiesOrderBy;
