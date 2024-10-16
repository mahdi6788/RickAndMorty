import "./App.css";
import CharacterList from "./components/CharacterList";
import CharecterDetail from "./components/CharecterDetail";
import Navbar, { SearchResult } from "./components/Navbar";
import { allCharacters } from "../data/data";
import { useEffect, useState } from "react";

function App() {
  // we need to put charecters state into App compo because we need it for navbar as well.
  const [characters, setCharacters] = useState([]);
  // depending on the condition we decide to use useEffect or event handler function
  // 1st approach: useEffect to fetch data
  // useEffect(() => {
  //   fetch("https://rickandmortyapi.com/api/character")
  //     .then((res) => res.json())
  //     .then((data) => setCharacters(data.results));
  // }, []);

  // // 2nd approach: event handler function (button) to fetch data
  // function fetchCharacter() {
  //   fetch("https://rickandmortyapi.com/api/character")
  //     .then((res) => res.json())
  //     .then((data) => setCharacters(data.results));
  // }

  // use async await instead of then catch: 
  // first declare function fetchData
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://rickandmortyapi.com/api/character");
      const data = await res.json();
      setCharacters(data.results);
    }
    // then call that function
    fetchData();
  }, []);

  const numOfResult = characters.length;
  return (
    <div className="app">
      {/* use component composition for navbar and use num of result as a child to prevent props drilling */}
      <Navbar>
        <SearchResult numOfResult={numOfResult} />
      </Navbar>
      {/* <button style={{ color: "red" }} onClick={fetchCharacter}>
        Load Charecters
      </button> */}
      <div className="main">
        <CharacterList characters={characters} />
        <CharecterDetail />
      </div>
    </div>
  );
}

export default App;
