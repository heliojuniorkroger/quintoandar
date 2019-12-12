import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.View`
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 5;
    padding-left: 7;
    padding-right: 7;
    padding-top: 5;
    padding-bottom: 5;
    bottom: 15;
    right: 15;
    position: absolute;
`;

const Label = styled.Text`
    color: #fff;
    font-size: 14;
    font-weight: 600;
`;

const Pagination = ({ size, paginationIndex }) => {
    const label = `${paginationIndex + 1} de ${size}`;

    return (
        <Wrapper>
            <Label>
                {label}
            </Label>
        </Wrapper>
    );
};

Pagination.propTypes = {
    size: PropTypes.number.isRequired,
    paginationIndex: PropTypes.number.isRequired,
};

export default Pagination;
