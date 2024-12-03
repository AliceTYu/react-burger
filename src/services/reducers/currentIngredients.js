import {
  ADD_BUN,
  ADD_INGREDIENTS,
  DEL_INGREDIENTS,
  UPDATE_SORT,
} from "../actions/currentIngredients";

const initialState = {
  bun: null,
  ingredients: [],
};

export const currentIngredients = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUN:
      return {
        ...state,
        bun: action.payload.bun,
      };
    case ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          {
            id: action.payload.id,
            ...action.payload.newIngredient,
          },
        ],
      };
    case UPDATE_SORT:
      return {
        ...state,
        ingredients: action.payload.ingredients,
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
