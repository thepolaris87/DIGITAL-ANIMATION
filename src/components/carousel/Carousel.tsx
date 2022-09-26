import React, { ReactNode, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Box } from '@mui/system';
import classnames from 'classnames';

const ContentWrapper = styled('div')`
    width: 100%;
`;

const ContentsWrapper = styled('div')`
    position: relative;
    display: flex;
    transition: 0.5s;
    left: 0;
`;
const Arrow = styled('div')`
    position: absolute;
    color: black;
    font-size: 2rem;
    top: calc(50% - 1.5rem);
    width: 100%;
    pointer-events: none;

    & > div {        
        box-sizing: border-box;
        padding: 1rem;
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    .prev,
    .next {
        pointer-events: auto;
        cursor: pointer;
    }
    .none {
        pointer-events: none;
        color: grey;
    }
`;

export default function Carousel({ children }: { children: ReactNode }) {
    const [index, setIndex] = useState(0);
    const inner = useRef<HTMLDivElement>(null);
    const contents = React.Children.map(children, (el) => <ContentWrapper>{el}</ContentWrapper>);
    const childCount = React.Children.count(children);

    const slideHandler = (n: number) => {
        const target = inner.current;
        const targetIndex = index + n;
        if (target) {
            const contentWidth = target.children.item(0)?.getClientRects()[0].width || 0;
            target.style.left = `${contentWidth * targetIndex}px`;
            setIndex(targetIndex);
        }
    };

    return (
        <Box sx={{ position: 'relative', overflow: 'hidden', width: '100%' }}>
            <ContentsWrapper ref={inner} style={{ width: `${childCount * 100}%` }}>
                {contents}
            </ContentsWrapper>
            {childCount > 1 && (
                <Arrow>
                    <div>
                        <div className={classnames('prev', { none: index === 0 })} onClick={() => slideHandler(1)}>
                            ❮
                        </div>
                        <div className={classnames('next', { none: index === -(childCount - 1) })} onClick={() => slideHandler(-1)}>
                            ❯
                        </div>
                    </div>
                </Arrow>
            )}
        </Box>
    );
}
