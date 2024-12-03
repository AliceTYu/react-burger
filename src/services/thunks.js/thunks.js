import { URL_BASE } from "../../utils/fileWithConstants";
import { SET_INGREDIENTS } from "../actions/allIngredients";
import { ORDER_ERROR, ORDER_IS_LOADING, ORDER_REQUEST } from "../actions/order";

export const getIngredientsThunks = () => async (dispatch) => {
  try {
    const response = await fetch(`${URL_BASE}ingredients`);
    if (!response.ok) {
      throw new Error("Ошибка запроса!");
    }
    const data = await response.json();
    dispatch({ type: SET_INGREDIENTS, payload: { data: data.data } });
  } catch (err) {
    console.log(err);
  }
};

export const getRequestBac = (objData) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_IS_LOADING, payload: { loading: true } });
    const response = await fetch(`${URL_BASE}orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ ingredients: objData }),
    });
    if (!response.ok) {
      dispatch({ type: ORDER_ERROR, payload: { error: true } });
      throw new Error("Ошибка запроса!");
    }
    dispatch({ type: ORDER_IS_LOADING, payload: { loading: false } });
    const data = await response.json();
    dispatch({ type: ORDER_REQUEST, payload: { order: data } });
  } catch (err) {
    console.log(err);
  }
};
