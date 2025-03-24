import { IIngredientType } from "../../utils/types";

export const ADD_BUN: "ADD_BUN" = "ADD_BUN";
export const ADD_INGREDIENTS: "ADD_INGREDIENTS" = "ADD_INGREDIENTS";
export const DEL_INGREDIENTS: "DEL_INGREDIENTS" = "DEL_INGREDIENTS";
export const UPDATE_SORT: "UPDATE_SORT" = "UPDATE_SORT";
export const DELL_ALL_INGREDIENTS: "DELL_ALL_INGREDIENTS" = "DELL_ALL_INGREDIENTS";

type AddBunAction = {
  type: typeof ADD_BUN;
  payload: {
    bun: IIngredientType; 
  };
};

type AddIngredientsAction = {
  type: typeof ADD_INGREDIENTS;
  payload: {
    id: string; 
    newIngredient: IIngredientType; 
  };
};

type DelIngredientsAction = {
  type: typeof DEL_INGREDIENTS;
  payload: {
    deleteId: string; 
  };
};

type UpdateSortAction = {
  type: typeof UPDATE_SORT;
  payload: {
    ingredients: IIngredientType[];
  };
};

type DelAllIngredientsAction = {
  type: typeof DELL_ALL_INGREDIENTS;
  payload: {
    bun: null, 
    ingredients: {};
  };
};

export type CurrentIngredientsActions =
  | AddBunAction
  | AddIngredientsAction
  | DelIngredientsAction
  | UpdateSortAction
  | DelAllIngredientsAction;

export function addBun(msg: IIngredientType): AddBunAction {
  return {
    type: ADD_BUN,
    payload: { bun: msg },
  };
}

export function addIngredients(id: string, msg: IIngredientType): AddIngredientsAction {
  return {
    type: ADD_INGREDIENTS,
    payload: { id: id, newIngredient: msg },
  };
}

export function delIngredients(msg: string): DelIngredientsAction {
  return {
    type: DEL_INGREDIENTS,
    payload: { deleteId: msg },
  };
}

export function updateSortIngredients(msg: IIngredientType[]): UpdateSortAction {
  return {
    type: UPDATE_SORT,
    payload: { ingredients: msg },
  };
}

export function delAllIngredients(): DelAllIngredientsAction {
  return {
    type: DELL_ALL_INGREDIENTS,
    payload: { bun: null, ingredients: {} },
  };
}
