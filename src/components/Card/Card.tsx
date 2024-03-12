import { FC } from "react";
import styles from "./Card.module.scss";
import { Shop } from "./Shop/Shop";
import { FaIdCard, FaPlus } from "react-icons/fa";
interface CardProps {
  product: Product;
}
export const Card: FC<CardProps> = ({ product }) => {
  return (
    <div className={styles["card"]}>
      <div className={styles["card__header"]}>
        <img
          src={product.img || "https://placehold.it/300"}
          alt={product.prodName}
        />
        <Shop name={product.store} />
        {product.needsCard && <FaIdCard />}
      </div>
      <div className={styles["card__body"]}>
        <h3>{product.prodName}</h3>
        <h4>{product.prodQuantity}</h4>
      </div>
      <div className={styles["card__footer"]}>
        <div className={styles["card__price"]}>{product.price}</div>
        <button>
          <FaPlus />
        </button>
      </div>
    </div>
  );
};
