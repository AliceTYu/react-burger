import styles from "./ImageCircle.module.css";

interface propTypes {
  img?: string;
  overlap?: string;
  remainingCount?: number;
  lastImg?: boolean;
  style?: React.CSSProperties;
}

function ImageCircle({
  img,
  overlap,
  remainingCount,
  style,
  lastImg,
}: propTypes): JSX.Element {
  return (
    <div
      className={`${styles.img} mr-4 ${overlap && styles.overlap}`}
      style={style}
    >
      <img src={img} alt="img" />
      {lastImg && (
        <div className={`${styles.remainingCount} text_type_digits-default`}>
          +{remainingCount}
        </div>
      )}
    </div>
  );
}

export default ImageCircle;
