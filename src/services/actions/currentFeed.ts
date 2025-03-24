import { IOrderFeedIng } from "../../utils/types";

export const ADD_NAME: "ADD_NAME" = "ADD_NAME";
export const ADD_PRICE: "ADD_PRICE" = "ADD_PRICE";
export const ADD_FEED: "ADD_FEED" = "ADD_FEED";

type AddNameAction = {
  type: typeof ADD_NAME;
  payload: {
    name: string; 
  };
};

type AddPricesAction = {
  type: typeof ADD_PRICE;
  payload: {
    price: number; 
  };
};

type AddFeedAction = {
  type: typeof ADD_FEED;
  payload: {
    feed: IOrderFeedIng[]; 
  };
};

export type CurrentFeedActions =
  | AddNameAction
  | AddPricesAction
  | AddFeedAction

export function addName(msg: string): AddNameAction {
  return {
    type: ADD_NAME,
    payload: { name: msg },
  };
}

export function addPrice(msg: number): AddPricesAction {
  return {
    type: ADD_PRICE,
    payload: { price: msg },
  };
}

export function addImg(msg: IOrderFeedIng[]): AddFeedAction {
  return {
    type: ADD_FEED,
    payload: { feed: msg },
  };
}