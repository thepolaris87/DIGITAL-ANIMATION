import { ReactNode } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Button, Grid, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type METAMODAL = { children?: ReactNode; title?: string; open: boolean; save?: boolean; saveName?: string; onClose: () => void; onSave?: () => void };

export default function MetaModal({ children, title, save = true, saveName, open, onClose, onSave }: METAMODAL) {
    return (
        <Dialog
            sx={{ zIndex: 100 }}
            open={open}
            onClose={onClose}
            PaperProps={{ sx: { width: '100vw', height: '100vh', maxWidth: 'unset' } }}
            keepMounted={false}>
            <DialogTitle sx={{ padding: !title ? '0 20px' : '16px 20px' }}>
                <Grid container alignItems='center' justifyContent='space-between'>
                    <Grid item>{title && <Typography variant='h5'>{title}</Typography>}</Grid>
                    <Grid item>
                        <IconButton onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent dividers>{children}</DialogContent>
            {save && (
                <DialogActions>
                    <Button onClick={onSave}>{saveName ? saveName : 'SAVE'}</Button>
                </DialogActions>
            )}
        </Dialog>
    );
}
