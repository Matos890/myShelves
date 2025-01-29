import { Link, Links } from "react-router";
import Button from "./Button";
import Logo from "./Logo";
import styles from "./Navbar.module.css";
import SearchBar from "./SearchBar";

function Navbar() {
  return (
    <>
      <nav className={styles.navBar}>
        <Link className="logo" to="/">
          <Logo />
        </Link>
        <SearchBar />
        <div className="buttons">
          {/* <Button type={"whishlistButton"}>&#x2764;</Button>
          <Button type={"addLibraryButton"}>&#43;</Button> */}
          <Link to="/whishlist">
            <Button type={"whishlistButton"}>Whish List</Button>
          </Link>
          <Link to="/library">
            <Button type={"whishlistButton"}>Library</Button>
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
