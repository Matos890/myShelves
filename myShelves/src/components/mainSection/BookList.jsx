import styles from "./BookList.module.css";

import { useList } from "../../context/ListContext";
import BookItem from "../../components/BookItem";

const fakeBooks = {
  title: "Cent'anni di solitudine",
  author: "Gabriel Garcia Marquez",
  cover: "/100AnniDiSolitudine.jpg",
  plot: "Marquez descrive la vita di tre generazioni nel paese immaginario di Macondo",
};
const typeOptions ={
  isHomepage: 'Books',
  isLibrary : 'My books',
  isWishList : 'My Wishlist'
}
function BookList({ books, isLoading, type }) {
  let { isBookRead, isBookWished } = useList();
  console.log("altri libri", books);
  return (
    <div className={styles.bookListContainer}>
      <div className={styles.bookList}>
        <div className={styles.titleList}>
          <h2 className={styles.titleMostRead}>
            {typeOptions[type] || '' }
          </h2>
        </div>

        <div className={styles.bookListGrid}>
          {books.map((book) => {
            const read = isBookRead(book.id);
            const wished = isBookWished(book.id);
            return (
              <BookItem
                key={book.id}
                book={book}
                type={type}
                read={read}
                wished={wished}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default BookList;
