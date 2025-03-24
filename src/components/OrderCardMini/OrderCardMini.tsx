import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./OrderCardMini.module.css";
import ImageCircle from "../ImageCircle/ImageCircle";

interface propTypes {
  name: string;
  img: string;
  price: number;
  count: number;
}

function OrderCardMini({ name, price, count, img }: propTypes): JSX.Element {
  return (
    <div className={`${styles.block} mb-4`}>
      <div className={styles.blockMain}>
        <ImageCircle img={img} />
        <div className={`${styles.title} text text_type_main-default mr-4`}>
          {name}
        </div>
      </div>
      <div className={styles.priceBlock}>
        <div className={`${styles.count} text text_type_digits-default mr-3`}>
          {count} x {price}
        </div>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
}

export default OrderCardMini;
