import BookList from "../components/mainSection/BookList";
import Navbar from "../components/navbar/Navbar";

import { useList } from "../context/ListContext";
function WishList() {
  const { wishedBooks, isLoading } = useList();
  return (
    <>
      <Navbar />
      <BookList books={wishedBooks} type={'isWishList'} />
    </>
  );
}

export default WishList;
