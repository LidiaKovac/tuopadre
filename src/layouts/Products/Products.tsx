import { useEffect } from "react";
import { Card } from "../../components/Card/Card";
import styles from "./Products.module.scss";
import { getProducts } from "../../redux/slices/products";
import { useAppDispatch, useAppSelector } from "../../redux/store";
export const Products = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.data);
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  return (
    <div className={styles["products__wrap"]}>
      {products.map((p) => (
        <Card product={p} />
      ))}
    </div>
  );
};
