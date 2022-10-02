// REDUX
import { configureStore, Middleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import rootReducer from './slices';
import logger from 'redux-logger';

// API
import { QueryClient, QueryClientProvider } from 'react-query';

// ROUTER
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';

// STYLE
import { ThemeProvider } from '@mui/material';
import theme from './assets/styles/theme'; 

import { default as pack } from '../package.json';

console.log('version : v' + pack.version);

const middleware = [process.env.NODE_ENV === 'development' && logger].filter(Boolean) as Middleware[];

const store = configureStore({ reducer: rootReducer, middleware });

const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } });

function App() {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme}>
                    <BrowserRouter>
                        <Router />
                    </BrowserRouter>
                </ThemeProvider>
            </QueryClientProvider>
        </Provider>
    );
}

export default App;
