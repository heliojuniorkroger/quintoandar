import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BACKGROUND_COLOR, BORDER_COLOR } from '../constants';

const Wrapper = styled.TouchableOpacity`
    position: absolute;
    right: 15;
    bottom: 15;
    width: 40;
    height: 40;
    border-radius: 20;
    background-color: ${({ darkModeContext }) => BACKGROUND_COLOR[darkModeContext]};
    justify-content: center;
    align-items: center;
    border-width: 1;
    border-color: ${({ darkModeContext }) => BORDER_COLOR[darkModeContext]};
`;

// eslint-disable-next-line react/prop-types
const FAB = ({ onPress, children }) => {
    const darkModeContext = useSelector((store) => store.darkModeContext);

    return (
        <Wrapper
            activeOpacity={0.7}
            onPress={onPress}
            darkModeContext={darkModeContext}
        >
            {children}
        </Wrapper>
    );
};

FAB.propTypes = {
    onPress: PropTypes.func.isRequired,
};

export default FAB;
