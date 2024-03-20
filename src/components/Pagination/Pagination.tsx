import { useAppSelector } from "../../redux/store"
import styles from "./Pagination.module.scss"
export const Pagination = () => {
    const count = useAppSelector(state => state.products.count)
    const pages = new Array(Math.ceil(count / 20))
    return <div className={styles["pagination"]}>
        {pages.map(page => <div className="pagination__button">{page}</div>)}
    </div>
}