import { useDispatch } from "./../../index";
import { useTypesSelector } from "../../services/reducers";
import OrderCard from "../OrderCard/OrderCard";
import styles from "./OrderHistory.module.css";
import { useEffect } from "react";
import { URL_WS_USER } from "../../utils/fileWithConstants";
import {
  connectFeedUser,
  disconnectFeedUser,
} from "../../services/actions/feedActionsUser";
import { IOrderFeedIng } from "../../utils/types";
import { getCookie } from "../../utils/cookie";

function OrderHistory() {
  const { orders } = useTypesSelector((state) => state.feedReducerUser);
  const dispatch = useDispatch();

  const accessToken =
    getCookie("accessToken")?.replace(/^Bearer\s+/i, "") || "";

  useEffect(() => {
    dispatch(connectFeedUser(`${URL_WS_USER}?token=${accessToken}`));

    return () => {
      dispatch(disconnectFeedUser());
    };
  }, [dispatch]);

  const sortedOrders = [...(orders || [])].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className={styles.block}>
      {orders &&
        sortedOrders.map((el: IOrderFeedIng) => {
          return (
            <OrderCard
              key={el._id}
              id={el._id}
              name={el.name}
              createdAt={el.createdAt}
              number={el.number}
              ingredients={el.ingredients}
              status={el.status}
              typeOrders={"user"}
            />
          );
        })}
    </div>
  );
}

export default OrderHistory;
