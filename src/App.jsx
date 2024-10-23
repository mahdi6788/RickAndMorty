import "./App.css";
import CharacterList from "./components/CharacterList";
import CharecterDetail from "./components/CharecterDetail";
import Navbar, { Favourites, Search, SearchResult } from "./components/Navbar";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import useCharacters from "./hooks/useCharacters";

function App() {
  //// **** Hooks: useStates **** ////

  const [query, setQuery] = useState("");  //** Note 1
  /// to determine which cahracter is selected, via Id
  const [character, setCharacter] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  /// add characters to Favourites, load initial data from localStorage if it is empty, it return empty array 
  const [fav, setFav] = useState(JSON.parse(localStorage.getItem("favorites")) || []);
  /// collect id of characters
  const [favsId, setFavsId] = useState([]);
  /// custom hook
  const {characters, isLoading} = useCharacters(query)

  

  
  //// **** nested (local) functions **** ////

  async function handlerCharacter(id) {
    try {
      setSelectedId(id);

      if (character !== null && character.id === id) {
        return setCharacter(null), setSelectedId(null);
      }

      const selectedCharacter = await axios.get(
        `https://rickandmortyapi.com/api/character/${id}`
      );
      setCharacter(selectedCharacter.data);

      const episodeIds = selectedCharacter.data.episode.map((item) =>
        item.split("/").at(-1) ///separate the string by "/" then store the items into an array. using at(-1) we can select the latest item of array
      );
      const episodesInfo = await axios.get(
        `https://rickandmortyapi.com/api/episode/${episodeIds}`
      );
      setEpisodes([episodesInfo.data].flat()); /// remove brakets of object
    } catch (error) {
      toast(error.message);
    }
  }

  const numOfResult = characters.length;

  function addToFav(id) {
    if (!fav.includes(id)) {
      setFavsId([...favsId, id]);
      characters.map((item) => item.id === id && setFav([...fav, item]))
    }
  }

  /// by changing the fav as a dependency, localStorage save
  useEffect(()=>{
    localStorage.setItem("favorites", JSON.stringify(fav))
  }, [fav])



 //// *** jsx (render logic) *** ////

  return (
    <div className="app">
      <Toaster />
      {/* Note 5.1 */}
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={numOfResult} />
        <Favourites fav={fav} setFav={setFav} />
      </Navbar>
      <div className="main">
        <CharacterList
          characters={characters}
          isLoading={isLoading}
          handlerCharacter={handlerCharacter}
          selectedId={selectedId}
        />
        <CharecterDetail
          character={character}
          episodes={episodes}
          addToFav={addToFav}
        />
      </div>
    </div>
  );
}

export default App;
