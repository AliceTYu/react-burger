import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./OrderCard.module.css";
import { Link, useLocation } from "react-router-dom";
import { IOrderFeedIng } from "../../utils/types";
import Modal from "../Modal/Modal";
import OrderFeedId from "../OrderFeedId/OrderFeedId";
import { useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { useTypesSelector } from "../../services/reducers";
import { countUniqueIds } from "../../utils/totalPrice";
import ImageCircle from "../ImageCircle/ImageCircle";
import { feedReducerUser } from "./../../services/reducers/feedReducerUser";

function OrderCard({
  name,
  createdAt,
  number,
  id,
  status,
  typeOrders,
}: IOrderFeedIng): JSX.Element {
  const location = useLocation();
  const [visibleModal2, setVisibleModal2] = useState<boolean>(false);

  const modalClose = () => {
    setVisibleModal2(false);
  };

  const modalOpen = () => {
    setVisibleModal2(true);
  };

  const modal = (
    <>
      <Modal onClose={modalClose}>
        <OrderFeedId />
      </Modal>
    </>
  );

  const { orders } = useTypesSelector(
    typeOrders ? (state) => state.feedReducerUser : (state) => state.feedReducer
  );

  const allIngredients = useTypesSelector(
    (state) => state.allIngredientsReducer.allIngredients
  );

  const order = orders.find((el: IOrderFeedIng) => el._id === id);

  if (!order) {
    return <>Заказ не найден</>;
  }

  const uniqueIdCounts = countUniqueIds(order.ingredients || []);

  const totalPrice = Array.from(uniqueIdCounts).reduce((total, [id, count]) => {
    const ingredient = allIngredients.find((ing) => ing._id === id);
    return total + (ingredient ? ingredient.price * count : 0);
  }, 0);

  const uniqueIngredients = Array.from(uniqueIdCounts).map(([id]) => {
    return allIngredients.find((ing) => ing._id === id);
  });

  const displayedIngredients = uniqueIngredients.slice(0, 4);
  const displayedIngredients2 = uniqueIngredients.slice(4, 5);
  const remainingCount = uniqueIngredients.length - displayedIngredients.length;

  return (
    <>
      <Link
        to={typeOrders ? `/profile/orders/${id}` : `/feed/${id}`}
        onClick={() => modalOpen()}
        state={{ background: location }}
      >
        <div className={`pt-6 pl-6 pb-6 pt-6 mb-6 mr-2 ${styles.block}`}>
          <div className={`${styles.blockHeader} pb-6`}>
            <div className="text text_type_main-medium text_color_primary">
              #{number}
            </div>
            <div className="text text_type_main-default text_color_inactive">
              {formatDate(createdAt)}
            </div>
          </div>
          <div className="text text_type_main-medium pb-6 text_color_primary">
            {name}
          </div>

          <div className="text text_type_main-default text_color_success pb-2">
            {status && status == "created" && "Создан"}
            {status && status == "pending" && "Готовится"}
            {status && status == "done" && "Готов"}
          </div>

          <div className={styles.blockFooter}>
            <div className={styles.blockImg}>
              {displayedIngredients.map((ingredient, index) => (
                <ImageCircle
                  key={ingredient?._id}
                  img={ingredient?.image_mobile}
                  overlap={"overlap"}
                  style={{
                    zIndex: `${10 - index}`,
                  }}
                />
              ))}
              {displayedIngredients2.map((ingredient, index) => (
                <ImageCircle
                  key={ingredient?._id}
                  img={ingredient?.image_mobile}
                  overlap={"overlap"}
                  lastImg={true}
                  remainingCount={remainingCount}
                  style={{
                    zIndex: `0`,
                  }}
                />
              ))}
            </div>
            <div className={styles.blockPrice}>
              <div className="text text_type_main-medium pr-2 text_color_primary">
                {totalPrice}
              </div>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default OrderCard;
