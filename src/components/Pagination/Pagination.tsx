import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import styles from "./Pagination.module.scss";
import { IoPlayBackOutline, IoPlayForwardOutline } from "react-icons/io5";
import { getProducts, setPage } from "../../redux/slices/products";
export const Pagination = () => {
  const { count, page } = useAppSelector((state) => state.products);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pages, setPages] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const fetchProducts = (page: number) => {
    dispatch(setPage(page));

    dispatch(getProducts());
  };
  useEffect(() => {
    for (let i = 0; i < count / 20; i++) {
      setPages((prev) => [...prev, i]);
    }
  }, []);
  return (
    pages.length > 1 && <div className={styles["pagination"]}>
      <button
        className={styles["pagination__button"]}
        onClick={() => {
          fetchProducts(1);
        }}
      >
        <IoPlayBackOutline />
      </button>
      {pages
        .slice(
          page === 1 ? page - 1 : page <= 3 ? page - 2 : page - 3,
          page === 1 ? page + 4 : page <= 3 ? page + 3 : page + 2,
        )
        .map((p) => (
          <button
            key={p}
            className={styles["pagination__button"]}
            onClick={() => {
              fetchProducts(p + 1);
            }}
          >
            {p + 1 !== page ? <span>{p + 1}</span> : <strong>{p + 1}</strong>}
          </button>
        ))}
      <button
        className={styles["pagination__button"]}
        onClick={() => {
          fetchProducts(Math.ceil(count / 20));
        }}
      >
        <IoPlayForwardOutline />
      </button>
    </div>
  );
};
