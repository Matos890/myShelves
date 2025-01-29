import styles from "./SearchBar.module.css";
import { useKey } from "../useKey";
import { useState, useRef, useEffect } from "react";

const fakeBooks = {
  title: "Cent'anni di solitudine",
  author: "Gabriel Garcia Marquez",
  cover: "/100AnniDiSolitudine",
  plot: "Marquez descrive la vita di tre generazioni nel paese immaginario di Macondo",
};
// import SearchBook from "../navbar/SearchBook";
const apiKey = `AIzaSyADchramyQEI5GUwGMsK-N48t3uDCumqOM`;
const url = `https://www.googleapis.com/books/v1/volumes?q=`;
const urlISBN = `https://www.googleapis.com/books/v1/volumes?q=isbn:`;

function SearchBar() {
  const [book, setBook] = useState(fakeBooks);
  const [query, setQuery] = useState("");
  const inputElement = useRef(null);
  useKey("Enter", function () {
    if (document.activeElement === inputElement.current) {
      inputElement.current.focus();
    }
    setQuery("");
  });
  useEffect(
    function () {
      const controller = new AbortController();
      async function getBook() {
        try {
          let data;
          if (query.startsWith("978")) {
            const res = await fetch(`${urlISBN}${query}&key=${apiKey}`, {
              signal: controller.signal,
            });
            data = await res.json();
            console.log("ciao");
          } else {
            const res = await fetch(`${url}${query}&key=${apiKey}`, {
              signal: controller.signal,
            });
            data = await res.json();
          }

          if (data === "False") throw new Error("book not found");
          setBook(data);
          console.log(data);
        } catch (err) {
          console.error(err);
        }
      }

      if (query.length < 3) {
        setBook([]);
        return;
      }
      const timer = setTimeout(getBook, 500);
      return () => clearTimeout(timer);
    },
    [query]
  );
  return (
    <input
      type="search"
      value={query}
      placeholder="Search books..."
      onChange={(e) => setQuery(e.target.value)}
      className={styles.searchBar}
      ref={inputElement}
    ></input>
  );
}

export default SearchBar;
