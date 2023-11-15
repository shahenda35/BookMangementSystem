import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function BookComponent() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [yearTerm, setYearTerm] = useState(Number);
  const [allYears, setAllYears] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/books")
      .then((response) => {
        setBooks(response.data);

        const uniqueYears = [
          ...new Set(response.data.map((book) => book.publishedDate)),
        ];
        setAllYears(uniqueYears);

        console.log(response);
      })

      .catch((error) => console.error("error fetching:", error));
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/books/search?title=${searchTerm}`
      );
      setBooks(response.data);
    } catch (error) {
      const response = await axios.get(`http://localhost:3000/books`);
      setBooks(response.data);
    }
  };

  const handleYear = async () => {
    try {
      console.log(yearTerm);

      if (yearTerm) {
        const response = await axios.get(
          `http://localhost:3000/books/published-in-year?year=${yearTerm
            .toString()
            .slice(0, 4)}`
        );
        setBooks(response.data);
        console.log(response);
      }
    } catch (error) {
      const response = await axios.get(`http://localhost:3000/books`);
      setBooks(response.data);
    }
  };

  return (
    <div style={{ margin: 15 }}>
      <h2>Book List</h2>
      <div>
        <h6 style={{ display: "inline", marginRight: 15 }}>Search By Title</h6>
        <input
          style={{ borderRadius: 5 }}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch} className="btn btn-primary mb-1">
          Search
        </button>

        <div style={{ float: "right", marginRight: 20 }}>
          <h6 style={{ display: "inline", marginRight: 10 }}>
            Filter By Year:
          </h6>
          <select
            className="btn btn-primary"
            value={yearTerm}
            onChange={(e) => {
              setYearTerm(e.target.value);
            }}
            onBlur={(e) => {
              handleYear();
            }}
          >
            <option value="">All Years</option>
            {allYears.map((year) => (
              <option key={year} value={year}>
                {new Date(year).getFullYear()}
              </option>
            ))}
          </select>
        </div>
      </div>
      <table className="table table-primary table-striped-columns rounded-table mt-20">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Published Date</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{new Date(book.publishedDate).toLocaleDateString()}</td>
              <td>{book.briefDescription}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/CreateBook">
        <button className="btn btn-primary">Add New Book</button>
      </Link>
    </div>
  );
}

export default BookComponent;
