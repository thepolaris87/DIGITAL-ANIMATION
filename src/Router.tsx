import { Routes, Route, Navigate } from 'react-router-dom';

import Appbar from './components/appBar';
import Dialog from './pages/authoringPage/Dialog';

export default function Router() {
    return (
        <Appbar>
            <Routes>
                <Route path='/authoring/dialog' element={<Dialog />}></Route>
                <Route path='/*' element={<Navigate replace to='/authoring/dialog'></Navigate>}></Route>
            </Routes>
        </Appbar>
    );
}
