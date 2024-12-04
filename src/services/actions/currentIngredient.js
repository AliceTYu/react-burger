export const SET_CURRENT_INGREDIENT = "SET_CURRENT_INGREDIENT";
export const DEL_CURRENT_INGREDIENT = "DEL_CURRENT_INGREDIENT";

export function setCurrentIngredients(msg) {
  return {
    type: SET_CURRENT_INGREDIENT,
    payload: { currentIngredient: msg },
  };
}

export function delCurrentIngredients() {
  return {
    type: DEL_CURRENT_INGREDIENT,
  };
}
