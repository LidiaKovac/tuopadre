import { FC } from "react";
import styles from "./Input.module.scss"
import { BiSearchAlt } from "react-icons/bi";
export const Input: FC<InputComponent> = (props) => {
    return <div className={styles["input"]}>
        <input  {...props} />
        <BiSearchAlt onClick={props.submitAction} />
    </div>
}