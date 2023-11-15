import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CreateBookComponent() {
  const [postData, setBooks] = useState({
    title: "",
    author: "",
    publishedDate: "",
    briefDescription: "",
  });

  const requestData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/books",
        postData
      );
      console.log("POST request successful", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="createContainer">
      <h2 style={{ textAlign: "center" }}>Add Book</h2>
      <form>
        <div className="mb-3">
          <label>Title:</label>
          <input
            className="inputField"
            type="text"
            value={postData.title}
            onChange={(e) => setBooks({ ...postData, title: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Author:</label>
          <input
            className="inputField"
            type="text"
            value={postData.author}
            onChange={(e) => setBooks({ ...postData, author: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Published Date:</label>
          <input
            className="inputField"
            type="text"
            value={postData.publishedDate}
            onChange={(e) =>
              setBooks({ ...postData, publishedDate: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label>Brief Description:</label>
          <input
            className="inputField"
            type="text"
            value={postData.briefDescription}
            onChange={(e) =>
              setBooks({ ...postData, briefDescription: e.target.value })
            }
          />
        </div>

        <Link to="/books">
          <button
            type="button"
            onClick={requestData}
            className="btn btn-primary"
          >
            Submit
          </button>
        </Link>
      </form>
    </div>
  );
}

export default CreateBookComponent;
