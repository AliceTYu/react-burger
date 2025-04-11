import {
  applyMiddleware,
  combineReducers,
  createStore,
} from "redux";
import { orderReducer } from "./order";
import { currentIngredients } from "./currentIngredients";
import { currentIngredientReducer } from "./currentIngredient";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";
import { allIngredientsReducer } from "./allIngredients";
import { registrationEmailReducer } from "./regisrtation";
import { loginEmailReducer } from "./auth";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { feedReducer } from "./feedReducer";
import { connectFeed,
  disconnectFeed,
  onFeedWsOpen,
  onFeedWsClose,
  onFeedWsError,
  onFeedWsMessage, } from './../actions/feedActions';
import { connectFeedUser,
  disconnectFeedUser,
  onFeedWsOpenUser,
  onFeedWsCloseUser,
  onFeedWsErrorUser,
  onFeedWsMessageUser, } from './../actions/feedActionsUser';
import { currentFeedReducer } from "./currentFeed";
import { feedReducerUser } from "./feedReducerUser";
import { socketMiddlewareUser } from "../../middlewares/socket-middleware-user";

export const rootReducer = combineReducers({
  allIngredientsReducer,
  currentIngredients,
  currentIngredientReducer,
  orderReducer,
  registrationEmailReducer,
  loginEmailReducer,
  feedReducer,
  currentFeedReducer,
  feedReducerUser,
});

export type RootState = ReturnType<typeof rootReducer>
export const useTypesSelector: TypedUseSelectorHook<RootState> = useSelector

const feedMiddleware = socketMiddlewareUser({
  wsConnectUser: connectFeed,
  wsDisconnectUser: disconnectFeed,
  onOpenUser: onFeedWsOpen,
  onCloseUser: onFeedWsClose,
  onErrorUser: onFeedWsError,
  onMessageUser: onFeedWsMessage,
});

const feedMiddlewareUser = socketMiddlewareUser({
  wsConnectUser: connectFeedUser,
  wsDisconnectUser: disconnectFeedUser,
  onOpenUser: onFeedWsOpenUser,
  onCloseUser: onFeedWsCloseUser,
  onErrorUser: onFeedWsErrorUser,
  onMessageUser: onFeedWsMessageUser,
});

//@ts-ignore
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, feedMiddleware, feedMiddlewareUser))
);
