import {store} from '../index';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator,Dispatch } from 'redux';

import { TAuthActions } from '../services/actions/auth';
import { TBurgerActions } from '../services/actions/burger';
import { TWsActions } from '../services/actions/wsActions';

export interface TModal {
  active: boolean;
  setActive?: () => void;
  setClose: () => void;
  children?: React.ReactNode;
}

export type TIngredient = {
  _id: string,
  name: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number,
  listId?: string
}

export type TIngredientList = {
  [id:string]:TIngredient
}

export type TIngredientPreview = {
  name: string,
  image: string,
  price: number
}

export type TIngredientsTabs = {
  [name:string]: string
}

export type TIngredientsTabsRef = { [tab in keyof TIngredientsTabs]?: HTMLParagraphElement };
export type TIngredientsTabsActive = { [scrollTab in keyof TIngredientsTabs]?: boolean };

export type TIngredientsGroup = {
  type: string;
  list: Array<TIngredient>;
}

export type TIngredientsList = { [id: string]: Array<TIngredient>}

export type TOrder = {
  ingredients: string[],
  _id: string,
  status: string,
  number: number,
  name: string,
  createdAt: string,
  updatedAt: string
}

export type TOrderConstructor = {
  number: string,
  todo: string,
  status: string
}

export type TMiddleware = () => (store: any) => (next: any) => (action: any) => void

export type RootState = ReturnType<typeof store.getState>;

// Типизация всех экшенов приложения
type TApplicationActions = TAuthActions | TBurgerActions | TWsActions;

// Типизация thunk в нашем приложении
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>; 

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = typeof store.dispatch; 

export type TRes = {
  success: boolean,
  data: any,
  accessToken: string,
  refreshToken:string,
  user:{},
  order:TOrderConstructor
}