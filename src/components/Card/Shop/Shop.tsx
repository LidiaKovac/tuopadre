import { FC } from "react";
import coop from "../../../assets/shops/coop.png";
import pam from "../../../assets/shops/pam.png";
import lidl from "../../../assets/shops/lidl.png";
import carrefour_express from "../../../assets/shops/carrefour-express.png";
import carrefour_market from "../../../assets/shops/carrefour-market.png";
import esselunga from "../../../assets/shops/esselunga.png";
import penny from "../../../assets/shops/penny.png";
import basko from "../../../assets/shops/basko.png";
import styles from "../Card.module.scss"
interface ShopProps {
  name: string;
}
export const Shop: FC<ShopProps> = ({ name }) => {
  switch (name) {
    case "coop":
      return <img className={styles["shop__icon"]} src={coop} alt="coop logo" />;
    case "pam":
      return <img className={styles["shop__icon"]} src={pam} alt="pam logo" />;
    case "lidl":
      return <img className={styles["shop__icon"]} src={lidl} alt="lidl logo" />;
    case "carrefour-express":
      return <img className={styles["shop__icon"]} src={carrefour_express} alt="carrefour express logo" />;
    case "carrefour-market":
      return <img className={styles["shop__icon"]} src={carrefour_market} alt="carrefour market logo" />;
    case "esselunga":
      return <img className={styles["shop__icon"]} src={esselunga} alt="esselunga logo" />;
    case "penny":
      return <img className={styles["shop__icon"]} src={penny} alt="penny logo" />;
    case "basko":
      return <img className={styles["shop__icon"]} src={basko} alt="basko logo" />;
    default:
      break;
  }
};
