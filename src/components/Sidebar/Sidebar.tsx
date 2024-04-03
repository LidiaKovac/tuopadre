import { ChangeEvent, useState } from "react";
import { Checkbox } from "../Forms/Checkbox/Checkbox";
import styles from "./Sidebar.module.scss";
import { FiMenu } from "react-icons/fi";
import { getProducts, setFilter, setPage } from "../../redux/slices/products";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Button } from "../Button/Button";
import { Shop } from "../Shop/Shop";
import { shops } from "../../utils/shops.utils";
import { Radio } from "../Forms/Radio/Radio";
export const Sidebar = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.products.filter);
  const [show, setShow] = useState<boolean>();
  const toggleOffCanvas = () => {
    setShow((prev) => !prev);
  };
  const addToFilters = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    dispatch(setFilter({ [id]: checked }));
  };
  const selectStore = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, name } = e.target;
    console.log(id, name);
    const alreadyIn = filters["store"] as string;
    if (alreadyIn.includes(id)) {
      console.log("Already in", id, alreadyIn.replaceAll(`${id}`, ""));
      dispatch(
        setFilter({
          [name]: alreadyIn.replaceAll(`${id}`, ""),
        }),
      );
    } else {
      dispatch(setFilter({ [name]: `${alreadyIn},${id}` }));
    }
  };
  const selectOrder = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, name } = e.target;
    console.log(name, id);

    dispatch(
      setFilter({
        [name]: id.replaceAll("_", ""),
      }),
    );
  };
  const fetchProducts = () => {
    dispatch(setPage(1));

    dispatch(getProducts());
  };
  return (
    <>
      <aside className={`${styles["sidebar"]} ${show ? styles["sidebar--close"] : ""}`}>
        <h2>Filtri:</h2>
        <Checkbox
          labelContent="Elementi con prezzi"
          id="price"
          onChange={addToFilters}
          checked={filters["price"] as boolean}
        />
        <hr />
        <h3>Negozi: </h3>
        {shops.map((shop) => {
          return (
            <div className={styles["sidebar__item"]} key={shop}>
              <Checkbox
                
                labelContent={
                  <>
                    {shop}
                    <Shop name={shop.toLowerCase().replace(" ", "-")} />
                  </>
                }
                name="store"
                id={shop}
                onChange={selectStore}
                checked={(filters["store"] as string).includes(shop)}
              />
            </div>
          );
        })}
        <hr />
        <h3>Ordina per: </h3>
        <div className={styles["sidebar__item"]}>
          <Radio
            labelContent={"Prezzo"}
            name="order"
            id="_price"
            onChange={selectOrder}
            checked={(filters["order"] as string) === "price"}
          />
        </div>
        <div className={styles["sidebar__item"]}>
          <Radio
            labelContent={"Nome"}
            name="order"
            id="prodName"
            onChange={selectOrder}
            checked={(filters["order"] as string) === "prodName"}
          />
        </div>

        <div className={styles["sidebar__item"]}>
          <Radio
            labelContent={"Negozio"}
            name="order"
            id={"store"}
            onChange={selectOrder}
            checked={(filters["order"] as string) === "store"}
          />
        </div>
        <Button status="danger" content="Filtra" onClick={fetchProducts} />
      </aside>
      <Button className={styles["button--show"]} onClick={toggleOffCanvas} content={<FiMenu />} />
    </>
  );
};
