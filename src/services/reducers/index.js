import { combineReducers } from 'redux';
import { burgerReducer } from './burger';

// Корневой редьюсер
export const rootReducer = combineReducers({
    burger: burgerReducer
}) 