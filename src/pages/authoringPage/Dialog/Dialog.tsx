import { Divider, Grid, Typography } from '@mui/material';
import Toolbox from './Toolbox';
import View from './View';
import Workspace from './Workspace';
import ExtraTab from './ExtraTab';
import { useSelector } from 'react-redux';
import { selectIntro } from '../../../slices/intro';
import { useQuery } from 'react-query';
import { getImage, getSound, getText } from '../../../apis/api';

const scale = 0.6;
export const canvasWidth = 1024;
export const canvasHeight = 768;

export default function Dialog() {
    const { data } = useSelector(selectIntro);
    const { data: soundData } = useQuery(['intro', 'sound'], getSound);
    const { data: textData } = useQuery(['intro', 'text'], getText.bind(null, {}));
    const { data: imageData } = useQuery(['intro', 'image'], getImage);

    if (!soundData || !textData || !imageData) return <div>데이터 로드중</div>;

    return (
        <Grid sx={{ width: '100%', height: '100vh', overflow: 'scroll' }} container direction='column' wrap='nowrap'>
            <Grid item>
                <Toolbox />
            </Grid>
            {data.length === 0 && (
                <Grid sx={{ width: '100%', flex: 1 }} container alignItems='center' justifyContent='center'>
                    <Typography className='jei-intro-title' sx={{ pb: 20, fontSize: '65px' }}>
                        씬을 추가해주세요.
                    </Typography>
                </Grid>
            )}
            {data.length !== 0 && (
                <Grid sx={{ width: '100%', flex: 1, p: 1 }} container wrap='nowrap'>
                    <Grid
                        id='scene-container'
                        sx={{
                            width: `${canvasWidth * scale + 98}px`,
                            minWidth: `${canvasWidth * scale + 98}px`,
                            height: 'calc(100vh - 120px)',
                            position: 'relative',
                            overflow: 'scroll'
                        }}
                        item>
                        <View scale={scale} />
                    </Grid>
                    <Divider sx={{ borderWidth: '1px', mr: 2 }} orientation='vertical' flexItem />
                    <Grid sx={{ width: `calc(100vw - ${canvasWidth * scale + 132}px)`, minWidth: `calc(100vw - ${canvasWidth * scale + 132}px)` }} item>
                        <Workspace />
                    </Grid>
                    <Grid sx={{ height: '100%' }} item>
                        <ExtraTab />
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
}
