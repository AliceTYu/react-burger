import { IIngredientType } from "../../utils/types";
import {
  ADD_BUN,
  ADD_INGREDIENTS,
  CurrentIngredientsActions,
  DEL_INGREDIENTS,
  DELL_ALL_INGREDIENTS,
  UPDATE_SORT,
} from "../actions/currentIngredients";

type initialStateTypes = {
  bun: IIngredientType | null; 
  ingredients: IIngredientType[]; 
};

export const initialState: initialStateTypes = {
  bun: null,
  ingredients: [],
};

export const currentIngredients = (state = initialState, action: CurrentIngredientsActions): initialStateTypes => {
  switch (action.type) {
    case ADD_BUN:
      return {
        ...state,
        bun: action.payload.bun,
      };
    case ADD_INGREDIENTS:
      const { id, ...restOfIngredient } = action.payload.newIngredient;
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          {
            id: action.payload.id,
            ...restOfIngredient,
          },
        ],
      };
    case UPDATE_SORT:
      return {
        ...state,
        ingredients: action.payload.ingredients,
      };
    case DELL_ALL_INGREDIENTS:
      return {
        bun: null,
        ingredients: [],
      };
    case DEL_INGREDIENTS:
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (el) => el.id !== action.payload.deleteId
        ),
      };
    default:
      return state;
  }
};
