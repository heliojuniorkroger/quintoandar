import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { BACKGROUND_COLOR, BORDER_COLOR } from '../constants';

const Wrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    height: 70;
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: ${({ darkModeContext }) => BACKGROUND_COLOR[darkModeContext]};
    border-top-width: 1;
    border-top-color: ${({ darkModeContext }) => BORDER_COLOR[darkModeContext]};
    margin-bottom: ${isIphoneX() ? 43 : 0};
`;

const BottomBar = ({ children }) => {
    const darkModeContext = useSelector((store) => store.darkModeContext);

    return (
        <Wrapper darkModeContext={darkModeContext}>
            {children}
        </Wrapper>
    );
};

BottomBar.propTypes = {
    children: PropTypes.element.isRequired,
};

export default BottomBar;
