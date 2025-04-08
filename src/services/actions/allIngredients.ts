import { IIngredientType } from "../../utils/types";

export const SET_INGREDIENTS: "SET_INGREDIENTS" = "SET_INGREDIENTS";
export const INGREDIENTS_ERROR: "INGREDIENTS_ERROR" = "INGREDIENTS_ERROR";

type SetIngredientsAction = {
  type: typeof SET_INGREDIENTS;
  payload: {
    data: IIngredientType[];
  };
};

type ErrorIngredientsAction = {
  type: typeof INGREDIENTS_ERROR;
  payload: {
    errorSet: boolean;
  };
};

export type AllIngredientsActions = SetIngredientsAction | ErrorIngredientsAction;

export function setIngredients(msg: IIngredientType[]): SetIngredientsAction {
  return {
    type: SET_INGREDIENTS,
    payload: { data: msg },
  };
}

export function errorIngredients(msg: boolean): ErrorIngredientsAction {
  return {
    type: INGREDIENTS_ERROR,
    payload: { errorSet: msg },
  };
}