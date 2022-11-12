import { MouseEventHandler } from 'react';
import { Delete } from '@mui/icons-material';
import AnimationIcon from '@mui/icons-material/Animation';
import { Grid, IconButton, Paper, Typography } from '@mui/material';
import { orange } from '@mui/material/colors';
import { GETIMAGE } from '../../../apis/api';
import { getImageCodeName } from '../View/Canvas/helper';

// DATA 기반 이미지
export const ImageItem = ({ image, focus, onClick }: { image: GETIMAGE; focus?: boolean | undefined; onClick?: () => void }) => {
    let w = 125;
    let h = 125;
    let numW = Number(image.width);
    let numH = Number(image.height);

    if (image.imageDivisionCode === '02') {
        numW = numW / Number(image.reference);
    }

    if (numW < 125 && numH < 125) {
        w = numW;
        h = numH;
    } else if (numW < numH) {
        w = numW * (125 / numH);
    } else {
        h = numH * (125 / numW);
    }
    return (
        <Paper
            className='cp'
            sx={{
                position: 'relative',
                width: '150px',
                height: '150px',
                m: 1,
                p: 1,
                border: `3px solid ${focus ? 'red' : 'transparent'}`
            }}
            onClick={onClick}>
            <Grid sx={{ height: '100%' }} container justifyContent={image.imageDivisionCode === '02' ? 'flex-start' : 'center'} alignItems='center'>
                {image.imageDivisionCode === '02' ? (
                    <img
                        style={{ position: 'absolute', clip: `rect(0, ${w}px, ${h}px, 0)` }}
                        width={`${w * Number(image.reference)}px`}
                        height={`${h}px`}
                        src={`https://sol-api.esls.io/images/A1/${image.imageId}.${image.extension}`}
                        alt='main'
                    />
                ) : (
                    <img width={`${w}px`} height={`${h}px`} src={`https://sol-api.esls.io/images/A1/${image.imageId}.${image.extension}`} alt='main' />
                )}
            </Grid>
        </Paper>
    );
};

export const ObjectsView = ({
    object,
    focus,
    onClick,
    forceDelete
}: {
    object: fabric.Object;
    focus?: boolean | undefined;
    onClick: MouseEventHandler<HTMLButtonElement> | undefined;
    forceDelete?: boolean;
}) => {
    const src = (object as fabric.Image)?.getSrc?.();
    const isMaster = !!object.data.master;
    const hasEffect = object.data.effects && object.data.length !== 0;
    let w = 125;
    let h = 125;
    let numW = Number(object.width);
    let numH = Number(object.height);
    if (numW < 125 && numH < 125) {
        w = numW;
        h = numH;
    } else if (numW < numH) {
        w = numW * (125 / numH);
    } else {
        h = numH * (125 / numW);
    }

    return (
        <>
            <Paper
                className='cp'
                sx={{
                    position: 'relative',
                    width: '150px',
                    height: '150px',
                    m: 1,
                    p: 1,
                    border: `3px solid ${focus ? 'red' : 'transparent'}`,
                    overflow: 'hidden'
                }}>
                <Grid sx={{ height: '100%' }} container justifyContent={object.data.imageDivisionCode === '02' ? 'flex-start' : 'center'} alignItems='center'>
                    {['background', 'basic', 'character'].includes(object.data.type) && <img width={`${w}px`} height={`${h}px`} src={src} alt={object.data.type} />}
                    {['text'].includes(object.data.type) && <Typography sx={{ width: '100%' }}>{(object as fabric.Textbox).text}</Typography>}
                    {['sprite'].includes(object.data.type) && (
                        <img
                            style={{
                                position: 'absolute',
                                clip: `rect(0, ${w}px, ${h}px, 0)`
                            }}
                            width={`${w * Number(object.data.frame)}px`}
                            height={`${h}px`}
                            src={src}
                            alt={object.data.type}
                        />
                    )}
                </Grid>
                {object.data.imageDivisionCode && src && (
                    <Typography
                        sx={{
                            position: 'absolute',
                            bottom: '0',
                            right: '0',
                            color: '#fff',
                            background: isMaster ? orange[900] : '#FFBF00',
                            borderRadius: '4px',
                            p: '0 8px',
                            fontSize: '12px'
                        }}>
                        {getImageCodeName(object.data.imageDivisionCode)}
                    </Typography>
                )}
            </Paper>
            {hasEffect && (
                <IconButton sx={{ position: 'absolute', left: '5px', top: '5px' }} disabled>
                    <AnimationIcon sx={{ color: orange[400] }} />
                </IconButton>
            )}
            {(!isMaster || forceDelete) && (
                <IconButton sx={{ position: 'absolute', right: '5px', top: '5px' }} onClick={onClick}>
                    <Delete />
                </IconButton>
            )}
        </>
    );
};
