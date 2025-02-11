import {
  createContext,
  useReducer,
  useEffect,
  useContext,
  useCallback,
  useState,
} from "react";
import { useList } from "./ListContext";
const BookContext = createContext();

const apiKey = import.meta.env.VITE_API_KEY;
console.log('ciao api',apiKey)
const url = `https://www.googleapis.com/books/v1/volumes?q=`;
const urlISBN = `https://www.googleapis.com/books/v1/volumes?q=isbn:`;
const urlId = `https://www.googleapis.com/books/v1/volumes/`;
const authorUrl = `https://www.googleapis.com/books/v1/volumes?q=inauthor:`;

const initialState = {
  isLoading: false,
  books: [],
  error: null,
  currentBook: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true, error: null };
    case "books/search":
      return { ...state, isLoading: false, books: action.payload, error: null };
    case "books/author":
      return { ...state, isLoading: false, books: action.payload, error: null };
    case "book/find":
      return { ...state, isLoading: false, currentBook: action.payload };
    case "set/read":
      return { ...state, read: true };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state; // Restituisci sempre lo stato attuale per azioni non riconosciute
  }
}

function BookProvider({ children }) {
  const [{ books, isLoading, currentBook, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // Stato per limitare le chiamate API
  const [requestCount, setRequestCount] = useState(0);
  const [lastResetTime, setLastResetTime] = useState(Date.now());

  // Funzione per gestire il reset del contatore delle richieste
  const resetRequestCount = () => {
    const currentTime = Date.now();
    if (currentTime - lastResetTime >= 60000) {
      setRequestCount(0);
      setLastResetTime(currentTime);
    }
  };

  // Funzione per cercare libri
  async function getBooks(query) {
    resetRequestCount(); // Reset del contatore delle richieste ad ogni chiamata

    // Limita le chiamate API a 10 al minuto
    if (requestCount >= 10) {
      console.log("Limite di richieste API raggiunto. Riprovare più tardi.");
      return;
    }

    dispatch({ type: "loading" });

    try {
      let res, data;
      if (!query || query.trim() === "") {
        dispatch({ type: "books/search", payload: [] }); // Resetta i risultati
        return;
      } else if (query.startsWith("978")) {
        res = await fetch(`${urlISBN}${query}&key=${apiKey}&maxResults=40`);
      } else {
        res = await fetch(`${url}${query}&key=${apiKey}&maxResults=40`);
      }
      data = await res.json();

      // Incrementa il contatore delle richieste
      setRequestCount((prevCount) => prevCount + 1);

      // Controlla se ci sono libri nei risultati
      const books = data.items || [];
      console.log(books);

      dispatch({ type: "books/search", payload: books });
    } catch (error) {
      console.error(error);
      dispatch({
        type: "rejected",
        payload: "An error occurred during fetch.",
      });
    }
  }

  const findBookInfo = useCallback(
    async (id) => {
      resetRequestCount(); // Reset del contatore delle richieste ad ogni chiamata

      // Limita le chiamate API a 10 al minuto
      if (requestCount >= 10) {
        console.log("Limite di richieste API raggiunto. Riprovare più tardi.");
        return;
      }

      dispatch({ type: "loading" });

      try {
        let data, res;
        // Effettua le chiamate API
        res = await fetch(`${urlId}${id}`);
        const resId = await fetch(`${urlId}${id}`);
        console.log(resId);

        // Gestisce la risposta
        data = await res.json();
        const currentBook = data || [];

        // Aggiorna lo stato tramite il dispatcher
        dispatch({ type: "book/find", payload: currentBook });

        // Incrementa il contatore delle richieste
        setRequestCount((prevCount) => prevCount + 1);
      } catch (error) {
        // Gestisce gli errori
        dispatch({
          type: "rejected",
          payload: "An error occurred during fetch.",
        });
      }
    },
    [dispatch, urlId, requestCount, lastResetTime]
  );

  async function findAuthorInfo(author) {
    resetRequestCount(); // Reset del contatore delle richieste ad ogni chiamata

    if (!author || author.trim() === "") {
      dispatch({ type: "books/author", payload: [] });
      return;
    }

    // Limita le chiamate API a 10 al minuto
    if (requestCount >= 10) {
      console.log("Limite di richieste API raggiunto. Riprovare più tardi.");
      return;
    }

    try {
      const res = await fetch(
        `${authorUrl}${author}&key=${apiKey}&maxResults=40`
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      const books = Array.isArray(data.items) ? data.items : [];
      dispatch({ type: "books/author", payload: books });

      // Incrementa il contatore delle richieste
      setRequestCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error("Error fetching author info:", error);
      dispatch({
        type: "rejected",
        payload: "An error occurred while fetching author information",
      });
    }
  }

  return (
    <BookContext.Provider
      value={{
        books,
        isLoading,
        currentBook,
        error,
        getBooks,
        findBookInfo,
        findAuthorInfo,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}

function useBooks() {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error("useBooks must be used within the BookProvider");
  }
  return context;
}

export { BookProvider, useBooks };
