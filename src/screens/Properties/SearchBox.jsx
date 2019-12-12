import React from 'react';
import { Modal, Text } from 'react-native';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { PRIMARY_COLOR, BORDER_COLOR, BACKGROUND_COLOR } from '../../constants';

const Wrapper = styled.View`
    background-color: ${({ darkModeContext }) => BACKGROUND_COLOR[darkModeContext]};
    border-radius: 8;
    flex-direction: row;
    padding-left: 10;
    padding-right: 10;
    padding-top: 15;
    padding-bottom: 15;
    justify-content: space-between;
    border-width: 1;
    border-color: ${({ darkModeContext }) => BORDER_COLOR[darkModeContext]};
    align-items: center;
`;

const InputWrapper = styled.View`
    flex-direction: row;
    justify-content: center;
    flex: 1;
    align-items: center;
`;

const Input = styled.TextInput`
    font-weight: 400;
    flex: 1;
    padding: 0;
`;

const FilterButton = styled.TouchableOpacity`
    padding-left: 10;
    border-left-width: 1;
    border-left-color: ${({ darkModeContext }) => BORDER_COLOR[darkModeContext]};
`;

const SearchBoxInput = () => {
    const darkModeContext = useSelector((store) => store.darkModeContext);

    const placeholderTextColor = darkModeContext === 'light'
        ? 'rgba(0, 0, 0, 0.5)'
        : 'rgba(255, 255, 255, 0.5)';

    return (
        <Wrapper darkModeContext={darkModeContext}>
            <InputWrapper>
                <Icon name="ios-search" color={PRIMARY_COLOR} size={16} style={{ paddingRight: 5 }} />
                <Input placeholder="Onde você quer morar?" placeholderTextColor={placeholderTextColor} />
            </InputWrapper>
            <FilterButton
                darkModeContext={darkModeContext}
                activeOpacity={0.7}
            >
                <Text style={{ color: PRIMARY_COLOR, fontWeight: '500' }}>Filtrar</Text>
            </FilterButton>
        </Wrapper>
    );
};

const SearchBox = () => {

};

export default SearchBox;
