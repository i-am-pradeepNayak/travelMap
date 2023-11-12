import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <Link to="/">
      <p className={styles.logo} >🚲travel ➡List🚗</p>
    </Link>
  );
}

export default Logo;
