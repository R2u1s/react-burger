import { combineReducers } from 'redux';
import { burgerReducer } from './burger';
import { authReducer } from './auth';
import { wsReducer } from './wsReducer';

// Корневой редьюсер
export const rootReducer = combineReducers({
    burger: burgerReducer,
    auth: authReducer,
    wsOrders: wsReducer
}) 