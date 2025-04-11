import { IIngredientType, IOrderFeedIng } from "../../utils/types";
import { ADD_FEED, ADD_PRICE, CurrentFeedActions } from "../actions/currentFeed";

type initialStateTypes = {
    name: string; 
    price: number | null; 
    feed: IOrderFeedIng[]; 
};

export const initialState: initialStateTypes = {
  name: '',
  price: null,
  feed: [],
};

export const currentFeedReducer = (state = initialState, action: CurrentFeedActions): initialStateTypes => {
  switch (action.type) {
    case ADD_FEED:
        return {
            ...state,
            feed: action.payload.feed,
        }
    case ADD_PRICE:
        return {
            ...state,
            price: action.payload.price,
        }
    default:
      return state;
  }
};