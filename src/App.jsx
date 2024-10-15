import "./App.css";
import CharacterList from "./components/CharacterList";
import CharecterDetail from "./components/CharecterDetail";
import Navbar from "./components/Navbar";
import {allCharacters} from "../data/data"

function App(){
  return (
    <div className="app">
      <Navbar />
      <div className="main">
        <CharacterList allCharacters={allCharacters} />
        <CharecterDetail  />
      </div>
      
    </div>
  )
}

export default App