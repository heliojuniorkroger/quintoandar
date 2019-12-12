/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import NavigationHeader from 'react-navigation-stack/src/views/Header/Header.tsx';
import { BORDER_COLOR, BACKGROUND_COLOR, TEXT_COLOR } from '../constants';

const Header = (props) => {
    const darkModeContext = useSelector((store) => store.darkModeContext);

    const { scene } = props;
    scene.descriptor.options.headerStyle = {
        backgroundColor: BACKGROUND_COLOR[darkModeContext],
        borderBottomWidth: 1,
        borderBottomColor: BORDER_COLOR[darkModeContext],
    };
    scene.descriptor.options.headerTintColor = TEXT_COLOR[darkModeContext];

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <NavigationHeader {...{ ...props, scene }} darkModeContext={darkModeContext} />;
};

export default Header;
