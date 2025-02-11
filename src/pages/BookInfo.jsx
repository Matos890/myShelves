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

  const fakeBooks = {
    title: "Unknown Title",
    author: "Unknown Author",
    cover: "/Default_book_cover.webp",
    plot: "Unknown Plot",
  };
  useEffect(() => {
    findBookInfo(id); // Chiamata all'API solo quando `id` cambia
  }, [id]);
  const { addBookRead, addBookWished, removeBookRead, removeBookWished } =
    useList();
  console.log("ei", !isLoading ? currentBook?.volumeInfo : "isloading");
  const title = currentBook?.volumeInfo?.title;
  const tagRegExp = new RegExp("<s*[^>]*>", "g");
  let description = currentBook?.volumeInfo?.description;
  description = description?.replace(tagRegExp, "");
  const cover = currentBook?.volumeInfo?.imageLinks?.thumbnail;
  const author = currentBook?.volumeInfo?.authors;
  const pageCount = currentBook?.volumeInfo?.pageCount;
  const publisher = currentBook?.volumeInfo?.publisher;

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
  function onhandleRemoveRead() {
    removeBookRead(id);
  }
  function onhandleRemoveWished() {
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
      <Navbar type={'isBookInfo'} />

      {!currentBook || isLoading ? (

        < div className="flex flex-col items-center mt-28 w-[90%]">
        <Loading />
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="flex min-h-fit  w-[80%] md:w-[80%] mt-[10rem] lg:flex-row flex-col items-center">
            <div className="flex flex-col w-full md:w-[50%] items-center">
              <div className="rounded-tr-[6%] rounded-br-[6%] rounded-bl-[0/4%] flex justify-center relative w-full h-fit mb-[2rem]">
                <img
                  className=" w-[25rem] h-full rounded-tr-[6%] rounded-br-[6%] rounded-bl-[0/4%]  "
                  src={cover || fakeBooks.cover}
                  alt=""
                />

                {}
              </div>
              <div className="flex justify-end gap-[1rem] ">
                {
                  <ButtonCircles
                    onClick={
                      read === true ? onhandleRemoveRead : onhandleAddRead
                    }
                    color={read === true ? "active" : "inactive"}>
                    &#43;
                  </ButtonCircles>
                }
                <ButtonCircles
                  onClick={
                    wished === true ? onhandleRemoveWished : onhandleAddWished
                  }
                  color={wished === true ? "active" : "inactive"}>
                  &#x2764;
                </ButtonCircles>
              </div>
            </div>
            <div className="flex flex-col relative xl:w-[50%] md:w-[70%] sm:gap-[2rem] gap-[.5rem] sm:w-[100%]">
              <div className="flex flex-col ">
                <h1 className="sm:text-[3.5rem] text-[2.8rem] text-neutral-300 font-semibold ">
                  {title}
                </h1>
                <div className="flex gap-2">
                  {author?.map((auth, i) => {
                    return (
                      <Link
                        className="w-fit inline-block"
                        to={`/bookInfo/author/${auth}`}>
                        <h3
                          className="sm:text-[2.2rem]  text-[1.8rem]
                   font-light text-neutral-500 hover:text-blue-300">
                          {auth || fakeBooks.author}

                          {i !== author.length - 1 && ","}
                        </h3>
                      </Link>
                    );
                  })}
                </div>
                <p className="text-[1.3rem] text-rose-100">
                  More info on{" "}
                  {author?.map((auth, i) => (
                    <a
                      className="hover:text-blue-200"
                      target="_blank"
                      href={`https://wikipedia.org/wiki/${auth}`}>
                      {auth}
                      {i !== author.length - 1 && ", "}
                    </a>
                  ))}
                </p>
              </div>
              <div className="text-[1.8rem] text-neutral-300">
                <p className="sm:text-[1.8rem] text-[1.5rem]">{description}</p>
              </div>

              <div className="sm:text-[1.5rem] text-[1.2rem] text-neutral-500">
                <p className="sm:text-[1.5rem] text-[1.2rem] font-light">
                  Pages: {pageCount}.
                </p>
              </div>
              <div className={styles.editor}>
                <p className="sm:text-[1.5rem] text-[1.2rem] text-neutral-500">
                  this edition is published by {publisher}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BookInfo;
