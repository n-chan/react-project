import React, { useState, useEffect, useRef } from "react";
import { TrieTree } from "../assets/TrieTree";

function SearchBar() {
  const [info, setInfo] = useState("");
  const [state, setState] = useState({
    activeOption: -1,
    filteredOptions: [],
    showOptions: false,
    userInput: "",
  });
  let stateTree = useRef(null);
  let stateMap = useRef(null);

  useEffect(() => {
    stateTree.current = new TrieTree();
    stateMap.current = new Map();
    fetch("states.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then(function (myJson) {
        Object.entries(myJson).forEach(function (state) {
          stateMap.current.set(state[0], state[1]);
          stateTree.current.add(state[0]);
        });
      });
  }, []);

  /**
   * Called when form is submitted.
   * @param {object} e event
   */
  const onSubmit = (e) => {
    e.preventDefault();
    getInfo();
  };

  const handleChange = (e) => {
    setState({
      ...state,
      activeOption: -1,
      filteredOptions: stateTree.current.getWords(e.currentTarget.value),
      showOptions: true,
      userInput: e.currentTarget.value,
    });
  };

  const onClick = (e) => {
    setState({
      ...state,
      activeOption: -1,
      filteredOptions: [],
      showOptions: false,
      userInput: e.currentTarget.innerText,
    });
  };

  let getFilteredOptionsList = function () {
    let optionList;
    if (state.showOptions) {
      if (state.filteredOptions.length >= 1) {
        optionList = (
          <ul className="options-list">
            {state.filteredOptions.map((optionName, index) => {
              let className = "option";
              if (index === state.activeOption) {
                className = "option-active";
              }
              return (
                <li className={className} key={optionName} onClick={onClick}>
                  {optionName}
                </li>
              );
            })}
          </ul>
        );
      }
    }
    return optionList;
  };

  let filteredOptionsList = getFilteredOptionsList();

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      setState({
        ...state,
        activeOption: -1,
        showOptions: false,
        userInput: state.filteredOptions[state.activeOption],
      });
    } else if (e.keyCode === 38) {
      if (state.activeOption === -1) {
        return;
      }
      setState({ ...state, activeOption: state.activeOption - 1 });
    } else if (e.keyCode === 40) {
      if (state.activeOption === state.filteredOptions.length) {
        return;
      }
      setState({ ...state, activeOption: state.activeOption + 1 });
    }
  };

  /**
   * Fetches information from API.
   * Stringifies the JSON data and sets it to 'info' variable.
   */
  const getInfo = async () => {
    console.log(stateMap.current.get(state.userInput));
    try {
      const response = await fetch(
        "https://api.covidtracking.com/v1/states/" +
          stateMap.current.get(state.userInput) +
          "/info.json"
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
          value={state.userInput}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          required
        />
        <button>Submit</button>
      </form>
      <ul>{filteredOptionsList}</ul>
      {info}
    </div>
  );
}

export default SearchBar;
