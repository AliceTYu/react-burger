import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./OrderFeedId.module.css";
import OrderCardMini from "../OrderCardMini/OrderCardMini";
import { useParams } from "react-router-dom";
import { IOrderFeedIng } from "../../utils/types";
import { useTypesSelector } from "../../services/reducers";
import { formatDate } from "./../../utils/formatDate";
import { useEffect } from "react";
import { URL_WS } from "../../utils/fileWithConstants";
import {
  connectFeed,
  disconnectFeed,
} from "../../services/actions/feedActions";
import { useDispatch } from "../..";
import { countUniqueIds } from "../../utils/totalPrice";

function OrderFeedId() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(connectFeed(URL_WS));

    return () => {
      dispatch(disconnectFeed());
    };
  }, [dispatch]);

  const { idFeed } = useParams();

  const { orders } = useTypesSelector((state) => state.feedReducer);
  const allIngredients = useTypesSelector(
    (state) => state.allIngredientsReducer.allIngredients
  );

  const order = orders.find((el: IOrderFeedIng) => el._id === idFeed);

  if (!order) {
    return <>Заказ не найден feed</>;
  }

  const uniqueIdCounts = countUniqueIds(order.ingredients || []);

  const totalPrice = Array.from(uniqueIdCounts).reduce((total, [id, count]) => {
    const ingredient = allIngredients.find((ing) => ing._id === id);
    return total + (ingredient ? ingredient.price * count : 0);
  }, 0);

  return (
    <div className={styles.blockMain}>
      <div className={styles.block}>
        <div
          className={`${styles.blockNumber} mb-10 text text_type_digits-default`}
        >
          #{order.number}
        </div>
        <div
          className={`${styles.blockTitle}  mb-3 text text_type_main-medium`}
        >
          {order.name}
        </div>
        <div
          className={`${styles.blockStatus} text text_type_main-default text_color_success mb-15`}
        >
          {order.status && order.status == "created" && "Создан"}
          {order.status && order.status == "pending" && "Готовится"}
          {order.status && order.status == "done" && "Готов"}
        </div>
        <div className={`${styles.blockText} text text_type_main-medium mb-6`}>
          Состав:
        </div>
        <div className={`${styles.blockInfo} mb-10 pr-6`}>
          {Array.from(uniqueIdCounts).map(([id, count]) => {
            const ingredient = allIngredients.find((ing) => ing._id === id);
            return (
              ingredient && (
                <OrderCardMini
                  key={id}
                  name={ingredient.name}
                  price={ingredient.price}
                  count={count}
                  img={ingredient.image_mobile}
                />
              )
            );
          })}
        </div>
        <div className={styles.blockFooter}>
          <div
            className={`${styles.blockTime} text text_type_main-small text_color_inactive`}
          >
            {formatDate(order.updatedAt)}
          </div>
          <div className={styles.blockPrice}>
            <div className="price mr-3 text text_type_digits-default">
              {totalPrice}
            </div>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderFeedId;
