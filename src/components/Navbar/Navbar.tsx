import { ChangeEventHandler, EventHandler, KeyboardEvent, MouseEvent, useState } from "react";
import { getProducts, setLoading, setPage, setQuery } from "../../redux/slices/products";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Button } from "../Button/Button";
import styles from "./Navbar.module.scss";
import { Input } from "../Forms/Input/Input";
import { useNavigate } from "react-router-dom";
export const Navbar = () => {
  const dispatch = useAppDispatch();
  const to = useNavigate();
  const [timeout, refreshTimeout] = useState<NodeJS.Timeout>();
  const query = useAppSelector((state) => state.products.query);
  const me = useAppSelector((state) => state.user.me);
  const saveQuery: ChangeEventHandler<HTMLInputElement> = async (e) => {
    dispatch(setQuery(e.target.value.replaceAll("/", "").replaceAll("\\", "")));
  };
  const fetchProds: EventHandler<KeyboardEvent<HTMLInputElement> | MouseEvent> = async (e) => {
    clearTimeout(timeout);

    if (e.nativeEvent.type === "click" && e.type === "click") {
      dispatch(setPage(1));
      dispatch(getProducts());
    } else if (e.nativeEvent.type === "keyup" && e.type === "keyup") {
      const event = e as KeyboardEvent;
      if (event.key === "Enter") {
        dispatch(setPage(1));

        dispatch(getProducts());
      } else {
        dispatch(setLoading(true));
        const t = setTimeout(() => {
          dispatch(setPage(1));

          dispatch(getProducts());
        }, 500);
        refreshTimeout(t);
      }
    }
    clearTimeout(timeout);
  };
  return (
    <nav className={styles["navbar"]}>
      <div className={styles["navbar__logo"]}>TuoPadre</div>
      <Input
        type="search"
        value={query || ""}
        placeholder="Chiedi a Tuo Padre..."
        onChange={saveQuery}
        submitAction={fetchProds}
        onKeyUp={fetchProds}
      />
      {!me && <Button content="Login" status="info" onClick={() => to("/login")} />}
    </nav>
  );
};
