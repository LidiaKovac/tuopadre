import { FC } from "react";
import styles from "./Radio.module.scss";
// import { useAppSelector } from "../../../redux/store"
export const Radio: FC<CheckboxRadioComponent> = ({ id, name, onChange, checked, labelContent }) => {
  return (
    <label htmlFor={id} className={styles["radio"]}>
      <input name={name} type="radio" id={id} onChange={onChange} checked={checked} />
      <div className={styles["radio__visible"]}>
        {/* <RxDotFilled /> */}
      </div>
      <div className={styles["radio__label"]}>{labelContent}</div>
    </label>
  );
};
