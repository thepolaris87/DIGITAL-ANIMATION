import { Grid, Paper, styled, Typography } from '@mui/material';
import { GETIMAGE } from '../../../../../apis/api';
import { IMAGEBASICFORM } from '../../../../../slices/intro';

// DATA 기반 이미지
export const ImageItem = ({ image, focus, onClick }: { image: GETIMAGE; focus?: boolean | undefined; onClick?: () => void }) => {
    const size = Number(image.width) > 125 || Number(image.height) > 125 ? '125px' : 'auto';
    return (
        <Paper className='cp' sx={{ position: 'relative', width: '150px', height: '150px', m: 1, p: 1, border: `3px solid ${focus ? 'red' : 'transparent'}` }} onClick={onClick}>
            <Grid sx={{ height: '100%' }} container justifyContent={image.imageDivisionCode === '02' ? 'flex-start' : 'center'} alignItems='center'>
                {image.imageDivisionCode === '02' ? (
                    <img
                        style={{ position: 'absolute', clip: 'rect(0, 125px, 125px, 0)' }}
                        width={`${125 * Number(image.reference)}px`}
                        height='125px'
                        // src={`${process.env.REACT_APP_SOL}/images/D1/${image.imageId}.${image.extension}`}
                        src={`/assets/images/${image.imageId}.${image.extension}`}
                        alt='main'
                    />
                ) : (
                    // <img width={size} height={size} src={`${process.env.REACT_APP_SOL}/images/D1/${image.imageId}.${image.extension}`} alt='main' />
                    <img width={size} height={size} src={`/assets/images/${image.imageId}.${image.extension}`} alt='main' />
                )}
            </Grid>
        </Paper>
    );
};
// REDUX 기반 이미지
export const ImageView = ({ image, focus }: { image: IMAGEBASICFORM; focus?: boolean | undefined }) => {
    const size = Number(image.width) > 125 || Number(image.height) > 125 ? '125px' : 'auto';
    return (
        <Paper className='cp' sx={{ position: 'relative', width: '150px', height: '150px', m: 1, p: 1, border: `3px solid ${focus ? 'red' : 'transparent'}`, overflow: 'hidden' }}>
            <Grid sx={{ height: '100%' }} container justifyContent={image.imageDivisionCode === '02' ? 'flex-start' : 'center'} alignItems='center'>
                {image.imageDivisionCode === '02' ? (
                    <img
                        style={{ position: 'absolute', clip: 'rect(0, 125px, 125px, 0)' }}
                        width={`${125 * Number(image.frame)}px`}
                        height='125px'
                        // src={`${process.env.REACT_APP_SOL}/images/D1/${image.src}.${image.extension}`}
                        src={`/assets/images/${image.src}.${image.extension}`}
                        alt='main'
                    />
                ) : (
                    // <img width={size} height={size} src={`${process.env.REACT_APP_SOL}/images/D1/${image.src}.${image.extension}`} alt='main' />
                    <img width={size} height={size} src={`/assets/images/${image.src}.${image.extension}`} alt='main' />
                )}
            </Grid>
            {image.imageDivisionCode === '02' && (
                <Typography sx={{ position: 'absolute', bottom: '0', right: '0', color: '#fff', background: '#FFBF00', borderRadius: '4px', p: '0 8px', fontSize: '12px' }}>
                    sprite
                </Typography>
            )}
        </Paper>
    );
};
