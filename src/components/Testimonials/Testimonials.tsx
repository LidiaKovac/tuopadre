import styles from "./Testimonials.module.scss";
export const Testimonials = () => {
  return (
    <div className={styles["testimonials"]}>
      <img
        src="https://source.boringavatars.com/beam/120/Stefan?colors=264653,2a9d8f,e9c46a"
        alt=""
      />
      <img src="https://source.boringavatars.com/beam/120/Alice" alt="" />
      <img
        src="https://source.boringavatars.com/beam/120/DeanWinchester?colors=583492,97f3be,9683eb"
        alt=""
      />
      <img
        src="https://source.boringavatars.com/beam/120/EmilyReed?colors=b42bc8,d7026e,3cd54a"
        alt=""
      />
      <span className={styles["text--big"]}>+1 botto Happy Hippos©</span>
      <span className={styles["text--mobile"]}>+1b HH©</span>
    </div>
  );
};
