import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { PRIMARY_COLOR, BACKGROUND_COLOR, BORDER_COLOR } from '../constants';

const Wrapper = styled.View`
    height: 49;
    border-top-width: 1;
    border-top-color: ${({ darkModeContext }) => BORDER_COLOR[darkModeContext]};
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-bottom: ${isIphoneX() ? 43 : 0};
`;

const Label = styled.Text`
    color: ${({ color }) => color};
    font-size: 12;
`;

const TabBar = ({
    navigation,
    renderIcon,
    getLabelText,
    onTabPress,
}) => {
    const darkModeContext = useSelector((store) => store.darkModeContext);

    const { state } = navigation;
    const { routes, index } = state;

    return (
        <View style={{ backgroundColor: BACKGROUND_COLOR[darkModeContext] }}>
            <Wrapper darkModeContext={darkModeContext}>
                {routes.map((route, i) => {
                    const color = index === i ? PRIMARY_COLOR : '#898a89';
                    return (
                        <TouchableWithoutFeedback key={i} onPress={() => onTabPress({ route })}>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Icon name={renderIcon({ route })} size={25} color={color} />
                                <Label color={color}>
                                    {getLabelText({ route })}
                                </Label>
                            </View>
                        </TouchableWithoutFeedback>
                    );
                })}
            </Wrapper>
        </View>
    );
};

TabBar.propTypes = {
    navigation: PropTypes.shape({
        state: PropTypes.shape({
            routes: PropTypes.array.isRequired,
            index: PropTypes.number.isRequired,
        }).isRequired,
    }).isRequired,
    renderIcon: PropTypes.func.isRequired,
    getLabelText: PropTypes.func.isRequired,
    onTabPress: PropTypes.func.isRequired,
};

export default TabBar;
