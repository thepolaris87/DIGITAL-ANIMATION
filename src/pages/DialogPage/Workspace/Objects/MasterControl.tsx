import { Grid, Switch, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectDialog, setControlMaster } from '../../../../slices/dialog';

export default function MasterControl() {
    const { data, currentDialog, render } = useSelector(selectDialog);
    const { dialog } = data;
    const dispatch = useDispatch();

    const masterCheck = dialog.find((el) => el.id === currentDialog)?.master;
    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        if (!checked && render) {
            render[currentDialog].forEachObject((el, i) => {
                const data = el.get('data');
                if (data.master) {
                    el.canvas?.remove(el);
                }
            });
            (render?.[currentDialog] as fabric.Canvas).backgroundImage = undefined;
            render?.[currentDialog].renderAll();
        }
        if (checked && render?.['master']) {
            const masterBackground = render['master']?.backgroundImage;
            const promiseFns: (() => Promise<void>)[] = [];

            render['master'].forEachObject((object, i) => {
                const promiseFn = () =>
                    new Promise<void>((resolve) => {
                        object.clone(
                            (object: fabric.Object) => {
                                object.set({ evented: false, selectable: false });
                                render[currentDialog].add(object);
                                object.sendToBack();
                                render[currentDialog].renderAll();
                                resolve();
                            },
                            ['data']
                        );
                    });
                promiseFns.push(promiseFn);
            });
            await Promise.all(promiseFns.map((fn) => fn()));

            render[currentDialog].backgroundImage = masterBackground;
            render[currentDialog].renderAll();
        }
        dispatch(setControlMaster(!masterCheck));
    };
    return (
        <Grid sx={{ mt: 2 }} container item alignItems='center' wrap='nowrap'>
            <Grid sx={{ mr: 2, width: '110px' }} item>
                <Typography className='jei-title'>MASTER</Typography>
            </Grid>
            <Switch checked={Boolean(masterCheck)} onChange={handleChange} />
        </Grid>
    );
}
