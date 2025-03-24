import { IIngredientType } from "../../utils/types";
import { AllIngredientsActions, INGREDIENTS_ERROR, SET_INGREDIENTS } from "../actions/allIngredients";

type initialStateTypes = {
  allIngredients: IIngredientType[];
  errorSet: boolean;
  isLoading: boolean;
};

const initialState: initialStateTypes = {
  allIngredients: [],
  errorSet: false,
  isLoading: false,
};

export function allIngredientsReducer(state = initialState, action: AllIngredientsActions): initialStateTypes {
  switch (action.type) {
    case SET_INGREDIENTS:
      return {
        ...state,
        allIngredients: action.payload.data,
      };
    case INGREDIENTS_ERROR:
      return {
        ...state,
        errorSet: action.payload.errorSet,
      };
    default:
      return state;
  }
}
