import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import styles from "./Pagination.module.scss";
import { getProducts } from "../../redux/slices/products";
export const Pagination = () => {
  const count = useAppSelector((state) => state.products.count);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pages, setPages] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const fetchBypage = (page: number) => {
    dispatch(getProducts({ query: { prodName: null }, page }));
  };
  useEffect(() => {
    for (let i = 0; i < count / 20; i++) {
      setPages((prev) => [...prev, i]);
    }
  }, []);
  return (
    <div className={styles["pagination"]}>
      {pages.map((page, i) => (
        <button
          className="pagination__button"
          onClick={() => {
            fetchBypage(i + 1);
          }}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};
