import { IIngredientType } from "../../utils/types";

export const SET_CURRENT_INGREDIENT: "SET_CURRENT_INGREDIENT" = "SET_CURRENT_INGREDIENT";
export const DEL_CURRENT_INGREDIENT: "DEL_CURRENT_INGREDIENT" = "DEL_CURRENT_INGREDIENT";

type SetCurrentIngredientAction = {
  type: typeof SET_CURRENT_INGREDIENT;
  payload: {
    currentIngredient: IIngredientType;
  };
};

type DelCurrentIngredientAction = {
  type: typeof DEL_CURRENT_INGREDIENT;
};

export type CurrentIngredientActions = SetCurrentIngredientAction | DelCurrentIngredientAction;

export function setCurrentIngredients(msg: IIngredientType): SetCurrentIngredientAction {
  return {
    type: SET_CURRENT_INGREDIENT,
    payload: { currentIngredient: msg },
  };
}

export function delCurrentIngredients(): DelCurrentIngredientAction {
  return {
    type: DEL_CURRENT_INGREDIENT,
  };
}
