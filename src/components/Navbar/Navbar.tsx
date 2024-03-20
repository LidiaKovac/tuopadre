import {
    ChangeEventHandler,
    EventHandler,
    KeyboardEvent,
    MouseEvent,
    useState,
} from "react"
import { getProducts, setLoading, setQuery } from "../../redux/slices/products"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { Button } from "../Button/Button"
import styles from "./Navbar.module.scss"
import { Input } from "../Forms/Input/Input"
export const Navbar = () => {
    const dispatch = useAppDispatch()
    const [timeout, refreshTimeout] = useState<NodeJS.Timeout>()
    const query = useAppSelector(state => state.products.query)
    const saveQuery: ChangeEventHandler<HTMLInputElement> = async (e) => {
        console.log("ok")
        dispatch(setQuery(e.target.value.replaceAll("/", "").replaceAll("\\", "")))
    }
    const fetchProds: EventHandler<
        KeyboardEvent<HTMLInputElement> | MouseEvent
    > = async (e) => {
        clearTimeout(timeout)

        if (e.nativeEvent.type === "click" && e.type === "click") {
            dispatch(getProducts({ query: { prodName: query! }, page: 1 }))
        } else if (e.nativeEvent.type === "keyup" && e.type === "keyup") {
            const event = e as KeyboardEvent
            if (event.key === "Enter") {
                dispatch(getProducts({ query: { prodName: query! }, page: 1 }))
            } else {
                dispatch(setLoading(true))
                const t = setTimeout(() => {
                    dispatch(getProducts({ query: { prodName: query! }, page: 1 }))
                }, 500)
                refreshTimeout(t)
            }
        }
        clearTimeout(timeout)
    }
    return (
        <nav className={styles["navbar"]}>
            <div className={styles["navbar__logo"]}>TuoPadre</div>
            <Input
                type="text"
                value={query || ""}
                placeholder="Chiedi a Tuo Padre..."
                onChange={saveQuery}
                submitAction={fetchProds}
                onKeyUp={fetchProds}
            />
            <Button content="Login" status="info" />
        </nav>
    )
}
