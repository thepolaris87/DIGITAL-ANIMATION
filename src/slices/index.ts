import { combineReducers } from 'redux';

import dialog from './dialog';

const rootReducer = combineReducers({ dialog });

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
