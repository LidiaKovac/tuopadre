import { FC } from "react";
import styles from "./Button.module.scss";
export const Button: FC<ButtonComponent> = ({
  status,
  content,
  onClick,
  type,
  disabled
}) => {
  return (
    <button
      className={`${styles["btn"]} ${styles[`btn--${status}`]}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      <span>{content}</span>
    </button>
  );
};
