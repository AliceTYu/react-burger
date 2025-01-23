import styles from "./OrderDetails.module.css";
import imageDone from "../../images/done.svg";
import { useSelector } from "react-redux";

function OrderDetails(): JSX.Element {
  // @ts-ignore
  const order = useSelector((state) => state.orderReducer.order);
  // @ts-ignore
  const error = useSelector((state) => state.orderReducer.error);
  // @ts-ignore
  const loading = useSelector((state) => state.orderReducer.isLoading);

  return (
    <div className={`${styles.order} pt-15 pb-15 pr-25 pl-25`}>
      {!error && !loading && (
        <>
          <div className="text text_type_digits-large pb-8">
            {order && order.order.number}
          </div>
          <div className="text text_type_main-medium pb-8">
            идентификатор заказа
          </div>
          <div className="pb-15">
            <img src={imageDone} alt="Иконка успешно выполненного заказа" />
          </div>
          <div className="text text_type_main-medium pb-2">
            Ваш заказ начали готовить
          </div>
          <div className="text text_type_main-default text_color_inactive">
            Дождитесь готовности на орбитальной станции
          </div>
        </>
      )}
      {loading && (
        <div className="text text_type_main-medium pb-8">
          Почти долетела до станции...
        </div>
      )}
      {error && (
        <div className="text text_type_main-medium pb-8">
          Выберите булки или ингредиенты
        </div>
      )}
    </div>
  );
}

export default OrderDetails;
