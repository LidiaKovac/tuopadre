import { FormEvent, useEffect } from "react";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Forms/Input/Input";
import styles from "./Login.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { login } from "../../redux/slices/user";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const dispatch = useAppDispatch();
  const { me, error } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const fd = new FormData(ev.target as HTMLFormElement);
    dispatch(login(fd));

    (ev.target as HTMLFormElement).reset();
  };
  useEffect(() => {
    if (me?.email && !error) {
      navigate("/");
    }
  }, [me?.email, error]);
  return (
    <div className={styles["login__wrap"]}>
      <form onSubmit={handleSubmit}>
        <Input required type="text" name="email" placeholder="Email" />
        <Input required type="password" name="password" placeholder="Password" />
        <Button content={"Login"} status="success" />
      </form>
    </div>
  );
};
