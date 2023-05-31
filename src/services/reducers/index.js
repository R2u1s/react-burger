import { combineReducers } from 'redux';
import { burgerReducer } from './burger';
import { authReducer } from './auth';

// Корневой редьюсер
export const rootReducer = combineReducers({
    burger: burgerReducer,
    auth: authReducer
}) 