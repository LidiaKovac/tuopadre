import { FC } from "react";
import styles from "./Checkbox.module.scss";
import { FaCheck } from "react-icons/fa";
// import { useAppSelector } from "../../../redux/store"
export const Checkbox: FC<CheckboxComponent> = ({ id, name, onChange, checked, labelContent }) => {
  return (
    <label htmlFor={id} className={styles["checkbox"]}>
      <input name={name} type="checkbox" id={id} onChange={onChange} checked={checked} />
      <div className={styles["checkbox__visible"]}>
        <FaCheck />
      </div>
      {labelContent}
    </label>
  );
};
