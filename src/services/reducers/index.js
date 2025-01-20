import { applyMiddleware, combineReducers } from "redux";
import { orderReducer } from "./order";
import { currentIngredients } from "./currentIngredients";
import { currentIngredientReducer } from "./currentIngredient";
import { composeWithDevTools } from "@redux-devtools/extension";
import { createStore } from "./../../../node_modules/dnd-core/node_modules/redux/src/createStore";
import { thunk } from "redux-thunk";
import { allIngredientsReducer } from "./allIngredients";
import { registrationEmailReducer } from "./regisrtation.js";
import { loginEmailReducer } from "./auth";

export const rootReducer = combineReducers({
  allIngredientsReducer,
  currentIngredients,
  currentIngredientReducer,
  orderReducer,
  registrationEmailReducer,
  loginEmailReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
