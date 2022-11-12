import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const EditingTextWrapper = styled(Box)`
    border: 1px solid #7575;
    box-sizing: border-box;
    margin-right: 4px;
    border-radius: 4px;
    padding: 1.5px;
`;

export const InputColor = styled('input')`
    width: 50px;
    height: 50px;
    background: transparent;
    border: none;
    cursor: pointer;

    &::-webkit-color-swatch {
        border-radius: 50%;
        border: none;
    }
`;
