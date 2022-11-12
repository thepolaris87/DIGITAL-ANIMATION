import { Routes, Route, Navigate } from 'react-router-dom';
import DialogPage from './pages/DialogPage';

export default function Router() {
    return (
        <Routes>
            <Route path='/:frameId' element={<DialogPage />}></Route>
            <Route path='/*' element={<Navigate replace to='/AF000001'></Navigate>}></Route>
        </Routes>
    );
}
