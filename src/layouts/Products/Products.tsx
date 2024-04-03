import { useEffect, useState } from "react";
import { Card } from "../../components/Card/Card";
import styles from "./Products.module.scss";
import { getProducts } from "../../redux/slices/products";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Loader } from "../../components/Loader/Loader";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Pagination } from "../../components/Pagination/Pagination";
export const Products = () => {
  const dispatch = useAppDispatch();
  const { data: products, query, count, loading, suggestions } = useAppSelector((state) => state.products);
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const [show, setShow] = useState(false);
  return (
    <div className={styles["products"]}>
      <Sidebar />
      <main>
        {loading && <Loader />}

        {!loading && (
          <>
            {!query && <h2>Tutti i prodotti: </h2>}
            {query && (
              <h2>
                Risultati della ricerca: {query} ({count}){" "}
              </h2>
            )}
            {products.length > 0 && <Pagination />}
            {suggestions?.length > 0 && (
              <div className={styles["products__suggestions"]} onClick={() => setShow((prev) => !prev)}>
                Clicca per vedere i {suggestions.length} prodotti simili in offerta alla Basko.
              </div>
            )}
            {suggestions?.length > 0 && show && (
              <div className={`${styles["products__wrap"]} ${styles["suggestions__wrap"]}`}>
                {suggestions.map((p) => (
                  <Card key={p._id} product={p} />
                ))}
              </div>
            )}
            <div className={styles["products__wrap"]}>
              {products.map((p) => (
                <Card key={p._id} product={p} />
              ))}
            </div>
            {products.length > 0 && <Pagination />}

            {products.length == 0 && <h2> Ops, non ci sono risultati. Ecco un toast per consolarti: 🥪 </h2>}
          </>
        )}
      </main>
    </div>
  );
};
