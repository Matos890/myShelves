import { Link } from "react-router";
import Button from "./Button";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

function Navbar({ type, query, setQuery }) {
  return (
    <>
      <nav className="h-full w-full  md:grid grid-cols-3 md:h-[7rem] items-center px-4 mt-10 justify-between md:justify-center flex flex-col gap-[1rem] md:flex-row ">
        <Link
          className="logo relative h-full w-[33%] md:w-full "
          to="/">
          <Logo className="absolute" />
        </Link>
        <SearchBar
          type={type}
          query={query}
          setQuery={setQuery}
        />
        <div className="flex gap-4">
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
