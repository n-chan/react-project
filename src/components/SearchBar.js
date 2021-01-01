import React, { useState } from "react";

function SearchBar() {
  const [text, setText] = useState("");
  const [info, setInfo] = useState("");

  /**
   * Called when form is submitted.
   * @param {object} e event
   */
  const onSubmit = (e) => {
    e.preventDefault();
    getInfo();
  };

  /**
   * Fetches information from API.
   * Stringifies the JSON data and sets it to 'info' variable.
   */
  const getInfo = async () => {
    try {
      const response = await fetch(
        "https://api.covidtracking.com/v1/states/" + text + "/info.json"
      );
      const jsonData = await response.json();
      setInfo(JSON.stringify(jsonData));
    } catch (err) {
      console.err(err.message);
      alert("Invalid!");
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="state">State Abbreviation:</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button>Submit</button>
      </form>
      <p>{info}</p>
    </div>
  );
}

export default SearchBar;
