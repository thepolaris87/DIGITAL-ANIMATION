import { styled, IconButton, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material/';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import HomeIcon from '@mui/icons-material/Home';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

// type MENUTAB = { drawerWidth: number; handleDrawerClose: React.MouseEventHandler<HTMLButtonElement>; theme: any; open: any };

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
}));

const onChangePage = (index) => {
    const getPageUrl = (index) =>
        ({
            0: window.location.pathname,
            1: '/learning',
            2: '/making',
            3: '/authoring'
        }[index]);
    return window.open(window.location.protocol + getPageUrl(index), '_self');
};

export default function MenuTab({ drawerWidth, handleDrawerClose, theme, open }) {
    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box'
                }
            }}
            variant='persistent'
            anchor='left'
            open={open}>
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                {['Home', 'Learning', 'Making', 'Authoring'].map((text, index) => (
                    <ListItem key={text} onClick={() => onChangePage(index)} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>{index % 4 === 0 ? <HomeIcon /> : <RocketLaunchIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </Drawer>
    );
}
