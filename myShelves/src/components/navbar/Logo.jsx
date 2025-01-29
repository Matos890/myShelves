
import { Link } from "react-router";
import styles from "./Navbar.module.css";
function Logo() {
    return (
        <div >
          <img
            className={styles.logoImg}
            src="/logos2-01.png"
            alt=""
          />
        </div>
    )
}

export default Logo
