import { useEffect, useState } from "react";
import styles from "./BookList.module.css";
import { useList } from "../../context/ListContext";
import BookItem from "../../components/BookItem";
import Loading from "../Loading";

const typeOptions = {
  isHomepage: "Books",
  isLibrary: "My books",
  isWishList: "My Wishlist",
};

function BookList({ books = [], isLoading, type, query }) {
  const { isBookRead, isBookWished } = useList();
  const [showNotFound, setShowNotFound] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchInitiated, setSearchInitiated] = useState(false);

  useEffect(() => {
    // 1. Quando isLoading diventa true, significa che è iniziata una nuova ricerca:
    if (isLoading) {
      setHasSearched(false); // Resetta hasSearched per la nuova ricerca
      setSearchInitiated(true); // Indica che è stata avviata una ricerca
      setShowNotFound(false); // Nasconde il messaggio "non trovato" durante il caricamento
    }
    // 2. Dopo che il caricamento è finito (isLoading è false) e una ricerca è stata avviata:
    else if (searchInitiated) {
      if (type === "isHomepage" && query.length >= 3 && books.length === 0) {
        // Se non ci sono risultati, mostra il messaggio "non trovato" dopo un breve ritardo
        setHasSearched(true); // Imposta hasSearched a true perché la ricerca è stata effettuata
        const timer = setTimeout(() => {
          setShowNotFound(true);
        }, 1000);
        return () => clearTimeout(timer); // Pulisce il timer se il componente viene smontato
      } else {
        setShowNotFound(false); // Se ci sono risultati, nasconde il messaggio "non trovato"
      }
    }
  }, [books, isLoading, searchInitiated]);

  return (
    <div className="flex items-center justify-center w-full">
      {isLoading ? (
        <div className="flex flex-col items-center mt-28 w-[90%]">
          <Loading />
        </div>
      ) : (
        <div className="flex flex-col items-center mt-28 w-[90%]">
          <div className="flex h-[3rem] items-end pt-2 w-full border-b-[0.5px] text-neutral-400 border-neutral-600 mb-[3rem]">
            <h2 className={styles.titleMostRead}>
              {typeOptions[type] || "Books"}
            </h2>
          </div>

          {books.length > 0 ? (
            <div className="flex flex-col w-full md:w-[50%] gap-5">
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
          ) : (
            showNotFound &&
            hasSearched && (
              <p className="text-neutral-400 text-[2rem]">Books not found</p>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default BookList;
