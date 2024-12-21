import { request } from "../../utils/checkResponse";
import { errorIngredients, setIngredients } from "../actions/allIngredients";
import { delAllIngredients } from "../actions/currentIngredients";
import { errorOrder, isLoadingOrder, setOrder } from "../actions/order";

export const getIngredientsThunks = () => async (dispatch) => {
  try {
    const data = await request("ingredients");
    dispatch(setIngredients(data.data));
  } catch (err) {
    dispatch(errorIngredients(true));
  }
};

export const getRequestBac = (objData) => async (dispatch) => {
  try {
    dispatch(isLoadingOrder(true));
    const data = await request("orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ ingredients: objData }),
    });
    dispatch(isLoadingOrder(false));
    dispatch(delAllIngredients());
    dispatch(setOrder(data));
  } catch (err) {
    dispatch(errorOrder(true));
  }
};
