export const SET_INGREDIENTS = "SET_INGREDIENTS";
export const INGREDIENTS_ERROR = "INGREDIENTS_ERROR";

export function setIngredients(msg) {
  return {
    type: SET_INGREDIENTS,
    payload: { data: msg },
  };
}

export function errorIngredients(msg) {
  return {
    type: INGREDIENTS_ERROR,
    payload: { errorSet: msg },
  };
}
