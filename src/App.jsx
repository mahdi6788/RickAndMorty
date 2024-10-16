import "./App.css";
import CharacterList from "./components/CharacterList";
import CharecterDetail from "./components/CharecterDetail";
import Navbar, { SearchResult } from "./components/Navbar";
import { allCharacters } from "../data/data";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

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

  // isLoading state and Loading component for showing message when user is waiting to fetch data from API
  const [isLoading, setIsLoading] = useState(false)
  // use async await instead of then catch: 
  // first declare function fetchData
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        const res = await fetch("https://rickandmortyapi.com/api/characters");
        if (!res.ok) throw new Error("Error")
        const data = await res.json();
        setCharacters(data.results);
        // setIsLoading(false)
      } catch (error) {
        // setIsLoading(false)
        console.log(error.message)
      } finally{
        setIsLoading(false)
      }
    }
    // then call that function
    fetchData();
  }, []);


  const numOfResult = characters.length;
  return (
    <div className="app">
      <Toaster />
      {/* use component composition for navbar and use num of result as a child to prevent props drilling */}
      <Navbar>
        <SearchResult numOfResult={numOfResult} />
      </Navbar>
      {/* <button style={{ color: "red" }} onClick={fetchCharacter}>
        Load Charecters
      </button> */}
      <div className="main">
        <CharacterList characters={characters} isLoading={isLoading}/>
        <CharecterDetail />
      </div>
    </div>
  );
}

export default App;
