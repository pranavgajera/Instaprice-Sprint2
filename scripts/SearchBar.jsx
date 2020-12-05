import React from "react";
import Socket from "./Socket";
import "../style/SearchBar.css";

export default function SearchBar() {
  const [input, setInput] = React.useState("");

  const makeSearchRequest = (e) => {
    e.preventDefault();
    Socket.emit("search request", {
      query: input,
    });
    setInput("");
  };

  return (
    <form htmlFor="newitem" onSubmit={makeSearchRequest} className="searchbar">
      <label htmlFor="textbox">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={"main-searchbar"}
        />
      </label>
      <button
        className={"submit-button"}
        onClick={makeSearchRequest}
        variant="primary"
        type="submit"
        value="Submit"
      >
        Submit
      </button>
    </form>
  );
}
