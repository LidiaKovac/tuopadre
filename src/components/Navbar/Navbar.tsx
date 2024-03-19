import {
    ChangeEventHandler,
    EventHandler,
    KeyboardEvent,
    MouseEvent,

    useState,
} from "react"
import { getProducts } from "../../redux/slices/products"
import { useAppDispatch } from "../../redux/store"
import { Button } from "../Button/Button"
import styles from "./Navbar.module.scss"
import { Input } from "../Input/Input"
export const Navbar = () => {
    const dispatch = useAppDispatch()
    const [timeout, refreshTimeout] = useState<NodeJS.Timeout>()
    const [query, setQuery] = useState<string>("")
    const fetchProdsWithTimeout: ChangeEventHandler<HTMLInputElement> = async (
        e
    ) => {
        setQuery(e.target.value)
        clearTimeout(timeout)
        const t = setTimeout(() => {
            if (e.target.value.length > 3) {
                dispatch(getProducts(e.target.value))
            }
        }, 1500)
        refreshTimeout(t)
    }
    const fetchProds: EventHandler<
        KeyboardEvent<HTMLInputElement> | MouseEvent
    > = async (e) => {
        if (e.nativeEvent.type === "click" && e.type === "click") {
            dispatch(getProducts(query))
        } else if (e.nativeEvent.type === "keyup" && e.type === "keyup") {
            const event = e as KeyboardEvent
            if (event.key === "Enter") {
                dispatch(getProducts(query))
            }
        }
        clearTimeout(timeout)
    }
    return (
        <nav className={styles["navbar"]}>
            <div className="navbar__logo">TuoPadre</div>
            <Input
                type="text"
                value={query}
                placeholder="Chiedi a Tuo Padre..."
                onChange={fetchProdsWithTimeout}
                submitAction={fetchProds}
                onKeyUp={fetchProds}
            />
            <Button content="Login" status="info" />
        </nav>
    )
}
