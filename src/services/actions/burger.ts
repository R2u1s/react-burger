import { AppDispatch, TIngredient, TOrder, TOrderConstructor } from "../../types/types";
import { request } from "../../utils/utils";
import { v4 as uuidv4 } from 'uuid';

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';
export const WRITE_INGREDIENT_PREVIEW: 'WRITE_INGREDIENT_PREVIEW' = 'WRITE_INGREDIENT_PREVIEW';
export const CLEAR_INGREDIENT_PREVIEW: 'CLEAR_INGREDIENT_PREVIEW' = 'CLEAR_INGREDIENT_PREVIEW';
export const POST_ORDER_REQUEST: 'POST_ORDER_REQUEST' = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS: 'POST_ORDER_SUCCESS' = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED: 'POST_ORDER_FAILED' = 'POST_ORDER_FAILED';
export const CLEAR_INGREDIENTS_LIST: 'CLEAR_INGREDIENTS_LIST' = 'CLEAR_INGREDIENTS_LIST';
export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT: 'REMOVE_INGREDIENT' = 'REMOVE_INGREDIENT';
export const SORT_INGREDIENTLIST: 'SORT_INGREDIENTLIST' = 'SORT_INGREDIENTLIST';

export interface IGetIngredientsRequestAction { readonly type: typeof GET_INGREDIENTS_REQUEST }
export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS,
  readonly ingredientsList: Array<TIngredient>
}
export interface IGetIngredientsFailedAction { readonly type: typeof GET_INGREDIENTS_FAILED }
export interface IPostOrderRequestAction { readonly type: typeof POST_ORDER_REQUEST }
export interface IPostOrderSuccessAction {
  readonly type: typeof POST_ORDER_SUCCESS,
  readonly order: TOrderConstructor,
  readonly ingredientsList: Array<TIngredient>
}
export interface IPostOrderFailedAction { readonly type: typeof POST_ORDER_FAILED }
export interface IWriteIngredientPreviewAction {
  readonly type: typeof WRITE_INGREDIENT_PREVIEW,
  readonly currentIngredient: TIngredient
}
export interface IRemoveIngredientAction {
  readonly type: typeof REMOVE_INGREDIENT,
  readonly currentIngredient: TIngredient
}
export interface ISortIngredientAction {
  readonly type: typeof SORT_INGREDIENTLIST,
  readonly dragIndex: number,
  readonly hoverIndex: number
}
export interface IClearIngredientsListAction { readonly type: typeof CLEAR_INGREDIENTS_LIST }
export interface IClearIngredientPreviewAction { readonly type: typeof CLEAR_INGREDIENT_PREVIEW }
export interface IAddIngredientAction {
  readonly type: typeof ADD_INGREDIENT,
  readonly currentIngredient: TIngredient
}

export type TBurgerActions =
  IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedAction
  | IPostOrderRequestAction
  | IPostOrderSuccessAction
  | IPostOrderFailedAction
  | IWriteIngredientPreviewAction
  | IRemoveIngredientAction
  | ISortIngredientAction
  | IClearIngredientsListAction
  | IClearIngredientPreviewAction
  | IAddIngredientAction

export const getIngredients = () => {
  return function (dispatch:AppDispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    request('ingredients')
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            ingredientsList: res.data
          });
        } else {
          dispatch({
            type: GET_INGREDIENTS_FAILED
          });
        }
      })
      .catch(error => {
        dispatch({
          type: GET_INGREDIENTS_FAILED
        });
        console.log(error);
      });
  };
}

export const writeIngredientPreview = (ingredient: TIngredient): IWriteIngredientPreviewAction => ({
  type: WRITE_INGREDIENT_PREVIEW,
  currentIngredient: ingredient
});

export const clearIngredientPreview = (): IClearIngredientPreviewAction => ({
  type: CLEAR_INGREDIENT_PREVIEW,
});

export const postOrder = (ingredientsList: Array<string>, token: string) => {
  return function (dispatch:AppDispatch) {
    dispatch({
      type: POST_ORDER_REQUEST
    });
    request("orders", {
      method: 'POST',
      headers: {
        authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "ingredients": ingredientsList
      })
    })
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: POST_ORDER_SUCCESS,
            order: res.order,
            ingredientsList: ingredientsList
          });
        } else {
          dispatch({
            type: POST_ORDER_FAILED
          });
        }
      })
      .catch(error => {
        dispatch({
          type: POST_ORDER_FAILED
        });
        console.log(error);
      });
  };
}

export const clearIngredientsList = (): IClearIngredientsListAction => ({
  type: CLEAR_INGREDIENTS_LIST,
});

export const addIngredient = (ingredient: TIngredient): {
  type: typeof ADD_INGREDIENT,
  currentIngredient: TIngredient
} => {
  const listId = uuidv4();
  const newIngredient = Object.assign({}, ingredient);
  newIngredient.listId = listId;
  return ({
    type: ADD_INGREDIENT,
    currentIngredient: newIngredient,
  });
}

export const removeIngredient = (ingredient: TIngredient): IRemoveIngredientAction => ({
  type: REMOVE_INGREDIENT,
  currentIngredient: ingredient
});


export const sortIngredient = (dragIndex: number, hoverIndex: number): ISortIngredientAction => ({
  type: SORT_INGREDIENTLIST,
  dragIndex: dragIndex,
  hoverIndex: hoverIndex
});
