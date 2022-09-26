import { createTheme } from '@mui/material/styles';


const theme = createTheme({
    palette: {
        effect: {
            main: 'rgb(255, 191, 0)'
        }
    },
    authoring: {
        font: {
            title: {
                fontSize: '1rem',
                color: '#757575',
                fontWeight: 'bold'
            },
            subtitle: {
                fontSize: '1rem',
                color: 'black',
                fontWeight: 'bold'
            },
            body: {
                fontSize: '1rem',
                color: 'black',
                fontWeight: 'bold'
            },
            label: {
                fontSize: '1rem',
                color: 'rgba(0, 0, 0, 0.54)',
                fontWeight: 'bold'
            }
        },
        background: {
            view: '#F8F8F8',
            canvas: '#273548'
        }
    }
});

export default theme;
