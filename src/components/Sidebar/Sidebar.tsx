import { ChangeEvent } from "react";
import { Checkbox } from "../Forms/Checkbox/Checkbox";
import styles from "./Sidebar.module.scss";
import { getProducts, setFilter } from "../../redux/slices/products";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Button } from "../Button/Button";
import { Shop } from "../Card/Shop/Shop";
export const Sidebar = () => {
    const dispatch = useAppDispatch();
    const filters = useAppSelector((state) => state.products.filter);

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
        dispatch(getProducts());
    };
    const shops = ["Basko", "Carrefour Express", "Carrefour Market", "Coop", "Esselunga", "Lidl", "Pam", "Penny"];
    return (
        <aside className={styles["sidebar"]}>
            <h2>Filtri:</h2>
            <Checkbox labelContent="Prezzi" id="price" onChange={addToFilters} checked={filters["price"] as boolean} />
            <hr />
            <h3>Negozi: </h3>
            {shops.map((shop) => {
                return (
                    <div className={styles["sidebar__item"]}>
                        <Checkbox
                            labelContent={shop}
                            name="store"
                            id={shop}
                            onChange={selectStore}
                            checked={(filters["store"] as string).includes(shop)}
                        />
                        <Shop name={shop.toLowerCase().replace(" ", "-")} />
                    </div>
                );
            })}
            <hr />
            <h3>Ordina per: </h3>
            <div className={styles["sidebar__item"]}>
                <Checkbox
                    labelContent={"Prezzo"}
                    name="order"
                    id="_price"
                    onChange={selectOrder}
                    checked={(filters["order"] as string) === "price"}
                />
            </div>
            <div className={styles["sidebar__item"]}>
                <Checkbox
                    labelContent={"Nome"}
                    name="order"
                    id="prodName"
                    onChange={selectOrder}
                    checked={(filters["order"] as string) === "prodName"}
                />
            </div>

            <div className={styles["sidebar__item"]}>
                <Checkbox
                    labelContent={"Negozio"}
                    name="order"
                    id={"store"}
                    onChange={selectOrder}
                    checked={(filters["order"] as string) === "store"}
                />
            </div>
            <Button status="danger" content="Filtra" onClick={fetchProducts} />
        </aside>
    );
};
