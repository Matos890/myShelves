import { Link } from "react-router";
import BookList from "../components/mainSection/BookList";
import Navbar from "../components/navbar/Navbar";
import { useBooks } from "../context/BookContext";

function Homepage() {
  const { books, isLoading } = useBooks();
  
  return (
    <>
      <Navbar type={'isHomepage'} />
      <BookList books={books} isLoading={isLoading}  type={'isHomepage'}/>
    </>
  );
}

export default Homepage;
