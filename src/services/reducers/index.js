import { combineReducers } from 'redux';
import { burgerReducer } from './app';

// Корневой редьюсер
export const rootReducer = combineReducers({
    burger: burgerReducer
}) 