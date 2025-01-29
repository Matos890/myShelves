import styles from "./SearchBar.module.css";
import { useKey } from "../useKey";
import { useState, useRef, useEffect } from "react";
import { useBooks } from "../../context/BookContext";

function SearchBar() {
  const [query, setQuery] = useState("");
  const inputElement = useRef(null);
  const { getBooks } = useBooks();

  // Gestione del tasto Enter
  useKey("Enter", () => {
    if (document.activeElement === inputElement.current) {
      inputElement.current.focus();
    }
    if (query.trim() !== "") {
      setQuery(""); // Resetta la query solo se non è vuota
    }
  });

  useEffect(() => {
    if (query.length < 3) {
      getBooks(""); // Assicurati che non venga chiamato se la query è vuota
      return;
    }
    const timer = setTimeout(() => {
      if (query.trim() !== "") {
        getBooks(query); // Chiama getBooks solo se la query non è vuota
      }
    }, 500);

    return () => clearTimeout(timer); // Cleanup del timer
  }, [query]);

  return (
    <input
      type="search"
      value={query}
      placeholder="Search books..."
      onChange={(e) => setQuery(e.target.value)}
      className={styles.searchBar}
      ref={inputElement}
    />
  );
}

export default SearchBar;
