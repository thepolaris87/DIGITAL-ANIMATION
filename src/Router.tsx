import { Routes, Route, Navigate } from 'react-router-dom';
import DialogPage from './pages/DialogPage';
import LearningPage from './pages/LearningPage';

export default function Router() {
    return (
        <Routes>
            <Route path='/main' element={<DialogPage />}></Route>
            <Route path='/main/:frameType' element={<LearningPage />}></Route>
            <Route path='/*' element={<Navigate replace to='/main'></Navigate>}></Route>
        </Routes>
    );
}
