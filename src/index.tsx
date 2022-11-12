import './assets/styles/font.css';
import './assets/styles/style.css';

import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { preloadFont } from './utils/util';

preloadFont().then(() => {
    const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
    root.render(<App />);
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
