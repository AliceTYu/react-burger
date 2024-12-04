import {
  DEL_CURRENT_INGREDIENT,
  SET_CURRENT_INGREDIENT,
} from "../actions/currentIngredient";

const initialState = {
  currentIngredient: {},
};

export const currentIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_INGREDIENT:
      return {
        currentIngredient: action.payload.currentIngredient,
      };
    case DEL_CURRENT_INGREDIENT:
      return {};
    default:
      return state;
  }
};
