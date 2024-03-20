import { useEffect } from "react";
import { Card } from "../../components/Card/Card";
import styles from "./Products.module.scss";
import { getProducts } from "../../redux/slices/products";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Loader } from "../../components/Loader/Loader";
import { Sidebar } from "../../components/Sidebar/Sidebar";
export const Products = () => {
  const dispatch = useAppDispatch();
  const { data: products, query, count, loading } = useAppSelector((state) => state.products);
  useEffect(() => {
    dispatch(getProducts(null));
  }, []);
  return (
    <div className={styles["products"]}>
      <Sidebar />
      <main>
        {loading && <Loader />}

        {!loading && <>
          {!query && <h2>Tutti i prodotti: </h2>}
          {query && <h2>Risultati della ricerca: {query} ({count}) </h2>}
          <p>manca un modo per andare avanti con le pagine</p>
          <div className={styles["products__wrap"]}>
            {products.map((p) => (
              <Card product={p} />
            ))}
          </div>
          {products.length == 0 && <h2> Ops, non ci sono risultati. Ecco un toast per l'attesa: 🥪 </h2>}
        </>}
      </main>

    </div>
  );
};
