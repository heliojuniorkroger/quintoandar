import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.View`
    flex-direction: row;
    position: absolute;
    bottom: 20;
    align-self: center;
`;

const Dot = styled.View`
    width: 8;
    height: 8;
    border-radius: 3.5;
    background-color: ${({ active }) => (active ? '#fff' : 'rgba(255, 255, 255, 0.4)')};
    margin-left: 7;
`;

const Pagination = ({ size, paginationIndex }) => (
    <Wrapper>
        {Array(size).fill(null).map((_, index) => (
            <Dot key={index} active={index === paginationIndex} />
        ))}
    </Wrapper>
);

Pagination.propTypes = {
    size: PropTypes.number.isRequired,
    paginationIndex: PropTypes.number.isRequired,
};

export default Pagination;
