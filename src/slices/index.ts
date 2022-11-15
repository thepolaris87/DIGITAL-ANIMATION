import { combineReducers } from 'redux';

import dialog from './dialog';
import learning from './learning';

const rootReducer = combineReducers({ dialog, learning });

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
