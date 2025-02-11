
import { Link } from "react-router";
import styles from "./Navbar.module.css";
function Logo() {
    return (
        <div className=" flex w-full justify-center h-[5rem] self-center">
          <img
            className='md:px-[10rem] '
            src="/logos2-01.png"
            alt=""
          />
        </div>
    )
}

export default Logo
