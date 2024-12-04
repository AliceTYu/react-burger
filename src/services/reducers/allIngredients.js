import { INGREDIENTS_ERROR, SET_INGREDIENTS } from "../actions/allIngredients";

const initialState = {
  allIngredients: [],
  errorSet: false,
  isLoading: false,
};

export function allIngredientsReducer(state = initialState, action) {
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
