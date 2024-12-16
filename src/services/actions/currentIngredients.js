export const ADD_BUN = "ADD_BUN";
export const ADD_INGREDIENTS = "ADD_INGREDIENTS";
export const DEL_INGREDIENTS = "DEL_INGREDIENTS";
export const UPDATE_SORT = "UPDATE_SORT";
export const DELL_ALL_INGREDIENTS = "DELL_ALL_INGREDIENTS";

export function addBun(msg) {
  return {
    type: ADD_BUN,
    payload: { bun: msg },
  };
}

export function addIngredients(id, msg) {
  return {
    type: ADD_INGREDIENTS,
    payload: { id: id, newIngredient: msg },
  };
}

export function delIngredients(msg) {
  return {
    type: DEL_INGREDIENTS,
    payload: { deleteId: msg },
  };
}

export function updateSortIngredients(msg) {
  return {
    type: UPDATE_SORT,
    payload: { ingredients: msg },
  };
}

export function delAllIngredients() {
  return {
    type: DELL_ALL_INGREDIENTS,
    payload: { bun: null, ingredients: {} },
  };
}
