import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Homepage from "./pages/Homepage";
import WishList from "./pages/WishList";
import Library from "./pages/Library";
import { BookProvider } from "./context/BookContext";
import { ListProvider } from "./context/ListContext";
import BookInfo from "./pages/BookInfo";
import AuthorInfo from "./pages/AuthorInfo";
function App() {
  return (
    <BookProvider>
      <ListProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/bookInfo/:id" element={<BookInfo />} />
            <Route path="/bookInfo/author/:author" element={<AuthorInfo />} />
            <Route path="/whishlist" element={<WishList />} />
            <Route path="/library" element={<Library />} />
          </Routes>
        </BrowserRouter>
      </ListProvider>
    </BookProvider>
  );
}
export default App;
