import "./App.css";
import CharacterList from "./components/CharacterList";
import CharecterDetail from "./components/CharecterDetail";
import Navbar from "./components/Navbar";
import { allCharacters } from "../data/data";
import { useState } from "react";

function App() {
  // we need to put charecters state into App compo because we need it for navbar as well.
  const [characters, setCharacters] = useState(allCharacters);
  const numOfResult = characters.length
  return (
    <div className="app">
      <Navbar numOfResult={numOfResult} />
      <div className="main">
        <CharacterList characters={characters} />
        <CharecterDetail />
      </div>
    </div>
  );
}

export default App;
