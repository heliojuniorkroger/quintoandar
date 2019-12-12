import React from 'react';
import { ViewPropTypes } from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { PRIMARY_COLOR, BACKGROUND_COLOR } from '../constants';

const getWidth = (size) => {
    if (size === 'full') return '100%';
    return size === 'lg' ? '170' : '150';
};

const Touchable = styled.TouchableOpacity`
    background-color: ${({ theme, darkModeContext }) => (
        theme === 'inverse' ? BACKGROUND_COLOR[darkModeContext] : PRIMARY_COLOR
    )};
    justify-content: center;
    align-items: center;
    border-radius: 8;
    height: ${({ size }) => (size === 'lg' ? 50 : 45)};
    width: ${({ size }) => getWidth(size)};
`;

const Title = styled.Text`
    color: ${({ theme }) => (theme === 'inverse' ? PRIMARY_COLOR : '#fff')};
    font-weight: 600;
    font-size: 15;
`;

const Button = ({
    title, onPress, size, theme, style,
}) => {
    const darkModeContext = useSelector((store) => store.darkModeContext);

    return (
        <Touchable
            onPress={onPress}
            activeOpacity={0.7}
            size={size}
            theme={theme}
            darkModeContext={darkModeContext}
            style={style}
        >
            <Title theme={theme}>{title}</Title>
        </Touchable>
    );
};

Button.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    size: PropTypes.string,
    theme: PropTypes.string,
    style: ViewPropTypes.style,
};

Button.defaultProps = {
    size: 'sm',
    theme: 'default',
    style: {},
};

export default Button;
