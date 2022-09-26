import { Box, styled } from '@mui/material';

export const ThumnailContainer = styled(Box)`
    display: flex;
    /* position: absolute; */
    border-radius: 8px;
    height: 140px;
    border: 2px solid #575757;
    background: #fff;
    padding: 8px 4px;
    margin-bottom: 8px;    
    & > .focus {
        & > svg {
            border: 2px solid red;
        }
    }
    & > div {
        margin: 0 4px;
        overflow: hidden;
        display: flex;
        align-items: center;
        cursor: pointer;
    }
    & > div > svg {
        border: 2px solid #757575;
        border-radius: 8px;
    }
`;
