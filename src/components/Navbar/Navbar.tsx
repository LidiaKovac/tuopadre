import {
    ChangeEventHandler,
    EventHandler,
    KeyboardEvent,
    MouseEvent,
    useState,
} from "react"
import { getProducts, setQuery } from "../../redux/slices/products"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { Button } from "../Button/Button"
import styles from "./Navbar.module.scss"
import { Input } from "../Input/Input"
export const Navbar = () => {
    const dispatch = useAppDispatch()
    const [timeout, refreshTimeout] = useState<NodeJS.Timeout>()
    const query = useAppSelector(state => state.products.query)
    const saveQuery: ChangeEventHandler<HTMLInputElement> = async (e) => {
        console.log("ok")
        dispatch(setQuery(e.target.value))
    }
    const fetchProds: EventHandler<
        KeyboardEvent<HTMLInputElement> | MouseEvent
    > = async (e) => {
        if (e.nativeEvent.type === "click" && e.type === "click") {
            dispatch(getProducts({ prodName: `/${query}/i` }))
        } else if (e.nativeEvent.type === "keyup" && e.type === "keyup") {
            const event = e as KeyboardEvent
            if (event.key === "Enter") {
                dispatch(getProducts({ prodName: `/${query}/i` }))
            } else {
                clearTimeout(timeout)
                const t = setTimeout(() => {
                    if (query && query.length > 3) {
                        dispatch(getProducts({ prodName: `/${query}/i` }))
                    }
                }, 1500)
                refreshTimeout(t)
            }
        }
        clearTimeout(timeout)
    }
    return (
        <nav className={styles["navbar"]}>
            <div className="navbar__logo">TuoPadre</div>
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
