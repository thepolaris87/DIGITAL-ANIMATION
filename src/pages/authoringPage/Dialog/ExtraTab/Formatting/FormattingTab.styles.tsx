import styled from '@emotion/styled';

export const InputColor = styled('input')`
    width: 60px;
    height: 60px;
    background: transparent;
    border: none;
    cursor: pointer;

    &::-webkit-color-swatch {
        border-radius: 50%;
        border: none;
    }
`;
