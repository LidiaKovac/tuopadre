import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import styles from "./Pagination.module.scss";
import { getProducts, setPage } from "../../redux/slices/products";
export const Pagination = () => {
    const { count, page } = useAppSelector((state) => state.products);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [pages, setPages] = useState<any[]>([]);
    const dispatch = useAppDispatch();
    const fetchProducts = () => {
        dispatch(getProducts({ prodName: null }));
    };
    useEffect(() => {
        for (let i = 0; i < count / 20; i++) {
            setPages((prev) => [...prev, i]);
        }
    }, []);
    return (
        <div className={styles["pagination"]}>
            {pages.slice(
                (page === 1) ? (page - 1) : (page <= 3) ? (page - 2) : (page - 3),
                (page === 1) ? (page + 4) : (page <= 3) ? (page + 3) : (page + 2))
                .map((p) => (
                    <button
                        className={styles["pagination__button"]}
                        onClick={() => {
                            dispatch(setPage(p + 1))
                            fetchProducts();
                        }}
                    >
                        {p + 1 !== page ? <span>
                            {p + 1}
                        </span> : <strong>{p + 1}</strong>}
                    </button>
                ))}
        </div>
    );
};
