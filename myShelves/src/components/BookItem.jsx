import ButtonCircles from "./ButtonCircles";
import styles from "./mainSection/BookList.module.css";
import { Link } from "react-router";
import { useList } from "../context/ListContext";
const fakeBooks = {
  title: "Cent'anni di solitudine",
  author: "Gabriel Garcia Marquez",
  cover: "/100AnniDiSolitudine.jpg",
  plot: "Marquez descrive la vita di tre generazioni nel paese immaginario di Macondo",
};
function BookItem({ book, type, read, wished }) {
  const { addBookRead, addBookWished, removeBookRead, removeBookWished } = useList();
  const title = book.volumeInfo?.title || book.title;
  const id = book.id || book.id;
  const authors = book.volumeInfo?.authors || book.authors;
  const cover = book.volumeInfo?.imageLinks?.thumbnail || book.cover;
  const description = book.volumeInfo?.description || book.description;

  function onhandleAddRead() {
    const bookRead = {
      id: id,
      title: title,
      authors: authors,
      cover: cover,
      description: description,
    };

    addBookRead(bookRead);
    console.log("ciao");
    console.log(bookRead);
  }
  function onhandleAddWished() {
    const bookWished = {
      id: id,
      title: title,
      authors: authors,
      cover: cover,
      description: description,
    };

    addBookWished(bookWished);
    console.log("ciao");
    console.log("whished", bookWished);
  }
  function onhandleRemoveRead(){
    removeBookRead(id);
  }
  function onhandleRemoveWished(){
    removeBookWished(id);
  }
  return (
    <div className={styles.bookItem}>
      <div className={styles.containerCoverBook}>
        <img src={`${cover || fakeBooks.cover}`} alt="" />
        <div className={styles.buttons}>
          <ButtonCircles
            color={read === true ? "active" : "inactive"}
            onClick={read === true? onhandleRemoveRead:onhandleAddRead}
          >
            &#43;
          </ButtonCircles>
            <ButtonCircles
              color={wished === true ? "active" : "inactive"}
              onClick={wished === true ? onhandleRemoveWished: onhandleAddWished}
            >
              &#x2764;
            </ButtonCircles>
        </div>
      </div>
      <div className={styles.containerInfo}>
        <Link to={`/bookInfo/${id}`}>
          <div className={styles.containerTitle}>
            <h6 className={styles.titleBook}>{title}</h6>
          </div>
        </Link>
          <div className={styles.containerAuthor}>
        <Link to={`/bookInfo/author/${authors}`}>
            <p className={styles.nameAuthor}> {authors || fakeBooks.author}</p>
        </Link>
        <p className={styles.description}>{description}</p>
          </div>
      </div>
    </div>
  );
}
export default BookItem;
