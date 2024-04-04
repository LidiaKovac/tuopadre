import { FC } from "react";
import styles from "./Button.module.scss";
export const Button: FC<ButtonComponent> = ({
  status,
  content,
  onClick,
  type,
  disabled,
  className
}) => {
  return (
    <button
      className={`${styles["btn"]} ${styles[`btn--${status}`]} ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      <span>{content}</span>
    </button>
  );
};
