import { createContext, useContext, useReducer } from "react";

const ListContext = createContext();
const listReadBooks = JSON.parse(localStorage.getItem("readBooks"));
const wishReadBooks = JSON.parse(localStorage.getItem("wishedBooks"));
const initialState = {
  isLoading: false,
  readBooks: listReadBooks || [],
  wishedBooks: wishReadBooks || [],
  error: null,
  currentBook: {},
};
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true, error: null };
    case "add/read":
      return {
        ...state,
        isLoading: false,
        read: true,
        readBooks: [...state.readBooks, action.payload],
        error: null,
      };
    case "remove/read":
      return {
        ...state,
        readBooks: [
          ...state.readBooks.filter((book) => book.id !== action.payload),
        ],
      };
    case "add/wished":
      return {
        ...state,
        isLoading: false,
        read: true,
        wishedBooks: [...state.wishedBooks, action.payload],
        error: null,
      };
    case "remove/wished":
      return {
        ...state,
        wishedBooks: [
          ...state.wishedBooks.filter((book) => book.id != action.payload),
        ],
      };
    case "set/read":
      return {
        ...state,
        isLoading: false,
        read: true,
      };
    default:
      break;
  }
}
function ListProvider({ children }) {
  const [
    { read, isLoading, readBooks, wishedBooks, error, currentBook },
    dispatch,
  ] = useReducer(reducer, initialState);
  function addBookRead(book) {
    if (isBookRead(book.id)) return;
    dispatch({ type: "loading" });
    dispatch({ type: "add/read", payload: book });

    localStorage.setItem("readBooks", JSON.stringify([...readBooks, book]));
  }
  function removeBookRead(id) {
    dispatch({ type: "remove/read", payload: id });
    localStorage.setItem(
      "readBooks",
      JSON.stringify(readBooks.filter((book) => book.id != id))
    );
  }
  function addBookWished(book) {
    if (isBookWished(book.id)) return;
    dispatch({ type: "loading" });
    dispatch({ type: "add/wished", payload: book });
    localStorage.setItem("wishedBooks", JSON.stringify([...wishedBooks, book]));
  }
  function removeBookWished(id) {
    dispatch({ type: "remove/wished", payload: id });
    localStorage.setItem(
      "wishedBooks",
      JSON.stringify(wishedBooks.filter((book) => book.id != id))
    );
  }
  function isBookRead(id) {
    return readBooks.some((readBook) => readBook.id === id);
  }
  function isBookWished(id) {
    return wishedBooks.some((wishedBook) => wishedBook.id === id);
  }
  return (
    <ListContext.Provider
      value={{
        read,
        readBooks,
        wishedBooks,
        isLoading,
        error,
        currentBook,
        addBookRead,
        addBookWished,
        isBookRead,
        isBookWished,
        removeBookRead,
        removeBookWished,
      }}
    >
      {children}
    </ListContext.Provider>
  );
}

function useList() {
  const context = useContext(ListContext);
  if (context === undefined) {
    throw new Error("useBooks must be used within the BookProvider");
  }
  return context;
}

export { ListProvider, useList };
