import '@mui/material';
import '@mui/material/styles';

declare module '@mui/material' {
    interface Theme {
        authoring: {
            font: any;
            background: {
                view: string;
                canvas: string;
            };
        };
    }
    interface ThemeOptions {
        authoring: {
            font: any;
            background: {
                view?: string;
                canvas?: string;
            };
        };
    }
    interface Palette {
        effect: Palette['primary'];
    }
    interface PaletteOptions {
        effect: PaletteOptions['primary'];
    }
    interface ButtonPropsColorOverrides {
        color: 'effect';
    }
}

interface ButtonPropsColorOverrides {
    color: 'effect';
}

declare module '@mui/material/styles' {
    interface Palette {
        effect: Palette['primary'];
    }
    interface PaletteOptions {
        effect: PaletteOptions['primary'];
    }
    interface ButtonPropsColorOverrides {
        color: 'effect';
    }
}
