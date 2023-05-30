import { combineReducers } from 'redux';
import { burgerReducer } from './burger';
import { authReducer } from './auth';
import { modalReducer } from './modal';

// Корневой редьюсер
export const rootReducer = combineReducers({
    burger: burgerReducer,
    auth: authReducer,
    modal: modalReducer
}) 