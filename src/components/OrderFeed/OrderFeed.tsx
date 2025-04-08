import { useEffect } from "react";
import { useTypesSelector } from "../../services/reducers";
import { IOrderFeedIng } from "../../utils/types";
import OrderCard from "../OrderCard/OrderCard";
import styles from "./OrderFeed.module.css";
import { useDispatch } from "./../../index";
import { URL_WS } from "../../utils/fileWithConstants";
import {
  connectFeed,
  disconnectFeed,
} from "../../services/actions/feedActions";

function OrderFeed(): JSX.Element {
  const { orders, total, totalToday } = useTypesSelector(
    (state) => state.feedReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(connectFeed(URL_WS));

    return () => {
      dispatch(disconnectFeed());
    };
  }, [dispatch]);

  return (
    <div className="wrapper pt-10">
      <p className="text text_type_main-large pb-5">Лента заказов</p>
      <div className={styles.block}>
        <div className={styles.blockScroll}>
          {orders &&
            orders.map((el: IOrderFeedIng) => {
              return (
                <OrderCard
                  key={el._id}
                  id={el._id}
                  name={el.name}
                  createdAt={el.createdAt}
                  number={el.number}
                  ingredients={el.ingredients}
                />
              );
            })}
        </div>
        <div className={styles.blockInfo}>
          <div className={styles.blockReady}>
            <div className="text text_type_main-medium pb-6">Готовы</div>
            <div
              className={`${styles.blockDone} text text_type_digits-medium text_color_success`}
            >
              <div className="pr-6">
                {orders &&
                  orders
                    .filter((el: IOrderFeedIng) => el.status === "done")
                    .slice(0, 5)
                    .map((el: IOrderFeedIng) => {
                      return (
                        <div key={el._id}>
                          {el.number}
                          <br></br>
                        </div>
                      );
                    })}
              </div>
              <div>
                {orders &&
                  orders
                    .filter((el: IOrderFeedIng) => el.status === "done")
                    .slice(5, 10)
                    .map((el: IOrderFeedIng) => {
                      return (
                        <div key={el._id}>
                          {el.number}
                          <br></br>
                        </div>
                      );
                    })}
              </div>
            </div>
          </div>
          <div className={styles.blockWork}>
            <div className="text text_type_main-medium pb-6">В работе:</div>
            <div className={`${styles.blockDone} text text_type_digits-medium`}>
              {orders &&
                orders
                  .filter(
                    (el: IOrderFeedIng) =>
                      el.status === "pending" || el.status === "created"
                  )
                  .slice(0, 5)
                  .map((el: IOrderFeedIng) => {
                    return (
                      <>
                        {el.number}
                        <br></br>
                      </>
                    );
                  })}
            </div>
          </div>
          <div className={styles.blockAll}>
            <div className="text text_type_main-medium pb-6">
              Выполнено за все время:
            </div>
            <div className="text text_type_digits-large">{total}</div>
          </div>
          <div className={styles.blockToday}>
            <div className="text text_type_main-medium pb-6">
              Выполнено за сегодня:
            </div>
            <div className="text text_type_digits-large">{totalToday}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderFeed;
