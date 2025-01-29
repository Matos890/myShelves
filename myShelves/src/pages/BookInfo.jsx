import { useEffect, useContext } from "react";
import Navbar from "../components/navbar/Navbar";
import { useBooks } from "../context/BookContext";
import Loading from "../components/Loading";
import { useParams } from "react-router";
import styles from "./BookInfo.module.css";
import { Link } from "react-router";
import ButtonCircles from "../components/ButtonCircles";
import { useList } from "../context/ListContext";
function BookInfo() {
  const { id } = useParams();
  let {
    findBookInfo,
    currentBook = {
      volumeInfo: {
        title: "",
        description: "",
        imageLinks: { thumbnail: "" },
        pageCount: null,
        publisher: "",
      },
    },
    isLoading,
  } = useBooks();

  useEffect(() => {
    findBookInfo(id); // Chiamata all'API solo quando `id` cambia
  }, [id]);
  const { addBookRead, addBookWished, removeBookRead, removeBookWished } = useList();
  console.log("ei", !isLoading ? currentBook?.volumeInfo : "isloading");
  const title = currentBook?.volumeInfo?.title;
  const tagRegExp = new RegExp("<s*[^>]*>", "g");
  let description = currentBook?.volumeInfo?.description;
  description = description?.replace(tagRegExp, "");
  const cover = currentBook?.volumeInfo?.imageLinks?.thumbnail;
  const author = currentBook?.volumeInfo?.authors;
  const pageCount = currentBook?.volumeInfo?.pageCount;

  let { isBookRead, isBookWished } = useList();

  const read = isBookRead(currentBook.id);
  const wished = isBookWished(currentBook.id);

  function onhandleAddRead() {
    const bookRead = {
      id: id,
      title: title,
      authors: author,
      cover: cover,
    };

    addBookRead(bookRead);
  }
  function onhandleRemoveRead(){
    removeBookRead(id);
  }
  function onhandleRemoveWished(){
    removeBookWished(id);
  }
  function onhandleAddWished() {
    const bookRead = {
      id: id,
      title: title,
      authors: author,
      cover: cover,
    };

    addBookWished(bookRead);
  }
  return (
    <>
      <Navbar />

      {!currentBook || isLoading ? (
        <Loading />
      ) : (
        <div className={styles.BookInfoBox}>
          <div className={styles.bookInfoContainer}>
            <div className={styles.coverTitleWriter}>
              <div className={styles.cover}>
                <img src={`${cover}`} alt="" />
                {}
              </div>
              <div className={styles.buttons}>
                {
                  <ButtonCircles
                    onClick={ read ===true ? onhandleRemoveRead : onhandleAddRead}
                    color={read === true ? "active" : "inactive"}
                  >
                    &#43;
                  </ButtonCircles>
                }
                <ButtonCircles
                  onClick={wished === true ? onhandleRemoveWished :onhandleAddWished}
                  color={wished === true ? "active" : "inactive"}
                >
                  &#x2764;
                </ButtonCircles>
              </div>
            </div>
            <div className={styles.bookDescriptionEditorPages}>
              <div className={styles.titleWriter}>
                <h1>{title}</h1>
                <Link to={`/bookInfo/author/${author}`}>
                  <h3 className={styles.authorName}>{author}</h3>
                </Link>
              </div>
              <div className={styles.description}>
                <p className={styles.paragraphDescription}>{description}</p>
              </div>

              <div className={styles.pages}>
                <p className={styles.pageCount}>Pages: {pageCount}.</p>
              </div>
              <div className={styles.editor}></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BookInfo;
