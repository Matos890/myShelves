import BookList from "../components/mainSection/BookList";
import { useEffect } from "react";
import { useParams } from "react-router";
import Navbar from "../components/navbar/Navbar";
import { useBooks } from "../context/BookContext";
function AuthorInfo() {
  const { findAuthorInfo, books, isLoading} = useBooks();
  const { author } = useParams();
  useEffect(() => {
    findAuthorInfo(author);
  }, [author]);
  console.log(author);
  return (
    <>
      <Navbar />
      <BookList books={books} isLoading={isLoading} type={'authorInfo'}/>
    </>
  );
}

export default AuthorInfo;
