import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { Testimonials } from "../../components/Testimonials/Testimonials";
import styles from "./Landing.module.scss";
export const Landing = () => {
    const navigate = useNavigate()
  return (
    <div className={styles["landing"]}>
      <div className={styles["landing__content"]}>
        <h1>Tuo Padre</h1>
        <section>
          <Testimonials/>
          <p>
            TuoPadre consulta settimanalmente tutti i volantini della tua città,
            e li raccoglie in un unico posto.
          </p>
          <Button status="info" content="Vedi i volantini" onClick={() => navigate("/")} />
        </section>
      </div>
    </div>
  );
};
