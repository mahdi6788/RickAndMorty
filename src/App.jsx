import "./App.css";
import CharacterList from "./components/CharacterList";
import CharecterDetail from "./components/CharecterDetail";
import Navbar, { Favourites, Logo, Search, SearchResult } from "./components/Navbar";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import useCharacters from "./hooks/useCharacters";
import useLocalStorage from "./hooks/useLocalStorage";


function App() {
  const [query, setQuery] = useState("");  //** Note 1
  const [character, setCharacter] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [favsId, setFavsId] = useState([]);
  const {characters, isLoading} = useCharacters(query)


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

  const [fav, setFav] = useLocalStorage("favourites", [])

  function addToFav(id) {
    if (!favsId.includes(id)) {
      setFavsId([...favsId, id]);
      characters.map((item) => item.id === id && setFav([...fav, item]))
    }
  }

  useEffect(()=>{
    if (query.length === 0) setCharacter(null)
    // console.log(query.length)
  },[query])


  return (
    <div>
      <Toaster />
      {/* Note 5.1 */}
      <Navbar>
        <Logo />
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
