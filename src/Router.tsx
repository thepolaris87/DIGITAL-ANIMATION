import { Routes, Route, Navigate } from 'react-router-dom';

import AuthoringPage from './pages/authoringPage/AuthoringPage';

import Appbar from './components/appBar';

export default function Router() {
    return (
        <Appbar>
            <Routes>
                <Route path='/authoring/:frameId' element={<AuthoringPage />}></Route>
                <Route path='/*' element={<Navigate replace to='/authoring/DF000001'></Navigate>}></Route>
            </Routes>
        </Appbar>
    );
}
