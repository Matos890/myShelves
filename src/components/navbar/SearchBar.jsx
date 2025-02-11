import { useKey } from "../useKey";
import { useState, useRef, useEffect } from "react";
import { useBooks } from "../../context/BookContext";
import { useNavigate } from "react-router";

function SearchBar({ type, query, setQuery }) {
  useEffect(()=>{
    console.log('useEFfect triggered')
  },[query])
  const inputElement = useRef(null);
  const { getBooks } = useBooks();
  const navigate = useNavigate();
  const handleSearch = () => {
    if (query.trim() !== "") {
      getBooks(query);
      navigate("/");
      setQuery(query);
    }
  };
  useEffect(() => {
    console.log(query);
  }, [query]);
  // Gestione del tasto Enter
  if (type === "isHomepage") {
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
  } else {
    useEffect(() => {
      const handleKeyDown = (e) => {
        if (
          e.key === "Enter" &&
          document.activeElement === inputElement.current
        ) {
          e.preventDefault(); // Previene comportamenti predefiniti
          handleSearch();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [query, getBooks]);
  }
  return (
    <div className="relative md:w-[80%] w-fit">
      <input
        type="search"
        value={query}
        placeholder="Search books..."
        onChange={(e) => setQuery(e.target.value)}
        className="border-neutral-400 text-neutral-300 border-1 relative rounded-2xl self-center focus:ring-0 ring-offset-[0.5px] focus:ring-neutral-800 text-[2rem] py-4 px-10 text-3xl bg-neutral-800 w-full focus:outline-none"
        ref={inputElement}
      />
      <div>
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-neutral-300 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
      </div>
      {type !== "isHomepage" && (
        <div className=" inset-y-0 flex items-center end-3 absolute">
          <button
            onClick={handleSearch}
            className=" w-full px-3 rounded-2xl border border-neutral-400 hover:text-blue-100 text-neutral-400 hover:bg-neutral-700 duration-75 ease-in-out cursor-pointer text-[1.5rem]  ">
            Search
          </button>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
