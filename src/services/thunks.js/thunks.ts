import { AppDispatch } from "../..";
import { request } from "../../utils/checkResponse";
import { getCookie } from "../../utils/cookie";
import { IIngredientType, IOrderResponse } from "../../utils/types";
import { errorIngredients, setIngredients } from "../actions/allIngredients";
import { delAllIngredients } from "../actions/currentIngredients";
import { errorOrder, isLoadingOrder, setOrder } from "../actions/order";

export const getIngredientsThunks = () => async (dispatch: AppDispatch) => {
  try {
    const data = await request<{ data: IIngredientType[] }>("ingredients");
    dispatch(setIngredients(data.data));
  } catch (err) {
    dispatch(errorIngredients(true));
  }
};

export const getRequestBac = (objData: string[]) => async (dispatch: AppDispatch) => {
  try {
    const accessToken = getCookie("accessToken");

    dispatch(isLoadingOrder(true));
    const data = await request<IOrderResponse>("orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: accessToken || '',
      },
      body: JSON.stringify({ ingredients: objData }),
    });
    dispatch(setOrder(data));
    dispatch(isLoadingOrder(false));
    dispatch(delAllIngredients());
  } catch (err) {
    dispatch(errorOrder(true));
  }
};
