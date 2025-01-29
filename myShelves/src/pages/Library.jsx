import BookList from "../components/mainSection/BookList";
import Navbar from "../components/navbar/Navbar";
import { useList } from "../context/ListContext";
function Library() {
  const { readBooks, isLoading } = useList();
  return (
    <>
      <Navbar />
      <BookList books={readBooks} isLoading={isLoading} type={'isLibrary'}/>
    </>
  );
}
export default Library;
