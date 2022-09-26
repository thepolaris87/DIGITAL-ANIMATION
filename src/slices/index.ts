import { combineReducers } from 'redux';
import intro from './intro';

const rootReducer = combineReducers({ intro });

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
