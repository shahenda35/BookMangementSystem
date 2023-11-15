import "./App.css";
import BookComponent from "./BookComponent";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CreateBookComponent from "./CreateBookComponent";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/CreateBook" element={<CreateBookComponent />} />

        <Route path="" element={<BookComponent />} />

        <Route path="/books" element={<BookComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
