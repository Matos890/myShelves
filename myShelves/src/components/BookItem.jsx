import ButtonCircles from "./ButtonCircles";
import styles from "./mainSection/BookList.module.css";
import { Link } from "react-router";
import { useList } from "../context/ListContext";
const fakeBooks = {
  title: "Unknown Title",
  author: "Unknown Author",
  cover: "/Default_book_cover.webp",
  plot: "Unknown Plot",
};
function BookItem({ book, type, read, wished }) {
  const { addBookRead, addBookWished, removeBookRead, removeBookWished } =
    useList();
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
  function onhandleRemoveRead() {
    removeBookRead(id);
  }
  function onhandleRemoveWished() {
    removeBookWished(id);
  }
  return (
    <div className="flex md:p-[2rem] border-[0.3px] border-neutral-600 duration-700 h-fit gap-[3rem] hover:bg-neutral-700 ">
      <div className="h-fit w-fit flex flex-col gap-5">
        <Link to={`/bookInfo/${id}`}>
          <img
            className="rounded-[.rem] h-[22rem]"
            src={`${cover || fakeBooks.cover}`}
            alt=""
          />
        </Link>
        <div className="flex justify-end gap-[1rem]">
          <ButtonCircles
            color={read === true ? "active" : "inactive"}
            onClick={read === true ? onhandleRemoveRead : onhandleAddRead}>
            &#43;
          </ButtonCircles>
          <ButtonCircles
            color={wished === true ? "active" : "inactive"}
            onClick={
              wished === true ? onhandleRemoveWished : onhandleAddWished
            }>
            &#x2764;
          </ButtonCircles>
        </div>
      </div>
      <div className="mt-[2rem] w-[70%]">
        <Link to={`/bookInfo/${id}`}>
          <div className={styles.containerTitle}>
            <h6 className=" text-[1.8rem] md:text-[2rem] text-neutral-300 font-semibold hover:text-red-300 duration-750">
              {title}
            </h6>
          </div>
        </Link>
        <div className="mt-[0.3rem] text-[2.4rem]">
          < div className="flex gap-1">
          {authors?.map((auth, i) => (
            <Link to={`/bookInfo/author/${auth}`}>
              <p className="text-[1.5rem] text-neutral-500 inline-block  hover:text-blue-300 duration-750">
                {auth || fakeBooks.author}
                {i != authors.length - 1 && ", "}
              </p>
            </Link>
          ))}
          </div>
          <Link to={`/bookInfo/${id}`}>
            <p className="text-[1.5rem] md:text-[1.8rem] max-h-[11rem] overflow-hidden text-ellipsis pt-[1rem] text-neutral-300">
              {description}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default BookItem;
