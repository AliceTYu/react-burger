import { IIngredientType } from "../../utils/types";
import {
  CurrentIngredientActions,
  DEL_CURRENT_INGREDIENT,
  SET_CURRENT_INGREDIENT,
} from "../actions/currentIngredient";

type initialStateTypes = {
  currentIngredient: IIngredientType | {}; 
};

export const initialState: initialStateTypes = {
  currentIngredient: {},
};

export const currentIngredientReducer = (state = initialState, action: CurrentIngredientActions): initialStateTypes => {
  switch (action.type) {
    case SET_CURRENT_INGREDIENT:
      return {
        currentIngredient: action.payload.currentIngredient,
      };
    case DEL_CURRENT_INGREDIENT:
      return {
        currentIngredient: {},
      }
    default:
      return state;
  }
};
