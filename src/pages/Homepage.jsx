import { Link } from "react-router";
import BookList from "../components/mainSection/BookList";
import Navbar from "../components/navbar/Navbar";
import { useBooks } from "../context/BookContext";
import { useState } from "react";

function Homepage() {
  const { books, isLoading } = useBooks();
  
  const [query, setQuery] = useState("");
  return (
    <>
      <Navbar type={'isHomepage'} query={query} setQuery={setQuery} />
      <BookList query={query} books={books} isLoading={isLoading}  type={'isHomepage'}/>
    </>
  );
}

export default Homepage;
