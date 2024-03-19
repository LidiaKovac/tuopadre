import { ChangeEventHandler, useState } from "react"
import { getProducts } from "../../redux/slices/products"
import { useAppDispatch } from "../../redux/store"
import { Button } from "../Button/Button"
import styles from "./Navbar.module.scss"
export const Navbar = () => {
    const dispatch = useAppDispatch()
    const [timeout, refreshTimeout] = useState<NodeJS.Timeout>()
    const [query, setQuery] = useState<string>("")
    const fetchProdsWithTimeout: ChangeEventHandler<HTMLInputElement> = async (e) => {
        setQuery(e.target.value)
        clearTimeout(timeout)
        const t = setTimeout(() => {
            if (e.target.value.length > 3) {
                dispatch(getProducts(e.target.value))
            }
        }, 1500)
        refreshTimeout(t)
    }
    return <nav className={styles["navbar"]}>
        <div className="navbar__logo">
            TuoPadre
        </div>
        <input type="text" value={query} placeholder="Chiedi a Tuo Padre..." onChange={fetchProdsWithTimeout} />
        <Button content="Login" status="info" />
    </nav>
}