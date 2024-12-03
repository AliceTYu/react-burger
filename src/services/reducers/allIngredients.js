import { SET_INGREDIENTS } from "../actions/allIngredients";

const initialState = {
  allIngredients: [],
};

export function allIngredientsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_INGREDIENTS:
      return {
        ...state,
        allIngredients: action.payload.data,
      };
    default:
      return state;
  }
}
