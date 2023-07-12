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
  listId?: number
}

export type TIngredientsTabs = {
  bun: string,
  sauce: string,
  main: string
}

export type TIngredientsTabsRef = { [refState in keyof TIngredientsTabs]: HTMLParagraphElement };
export type TIngredientsTabsActive = { [scrollTab in keyof TIngredientsTabs]: boolean };

export type TIngredientsGroup = {
  type: string;
  list: Array<TIngredient>;
}

export type TIngredientsList = {
  [id: string]: Array<TIngredient>
}

export type TOrder = {
  ingredients: string[],
  _id: string,
  status: string,
  number: number,
  name: string,
  createdAt: string,
  updatedAt: string
}