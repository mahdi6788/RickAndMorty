import "./App.css";
import CharacterList from "./components/CharacterList";
import CharecterDetail from "./components/CharecterDetail";
import Navbar, { Favourites, Search, SearchResult } from "./components/Navbar";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");  //** Note 1

  /// to determine which cahracter is selected, via Id
  const [character, setCharacter] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [episodes, setEpisodes] = useState([]);
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

  const [characters, setCharacters] = useState([]);

  /// To display message when waiting to fetch data from API
  const [isLoading, setIsLoading] = useState(false);

  ///use axios instead of using fetch

  useEffect(() => {
    async function fetchData() {
      /// not to show result if the input is less than 3 characters.
      if (query.length < 3) return setCharacters([]);

      try {
        setIsLoading(true);
        const res = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${query}`
        );
        setCharacters(res.data.results);
      } catch (error) {
        /// show empty if search does not have proper result
        setCharacters([]);
        toast.error(error.response.data.error); /// display error as a toast
      } finally {
        setIsLoading(false);
      }
    }
    fetchData(); /// Note 4.1.
  }, [query]);  /// Note 4

  const numOfResult = characters.length;

  /// add characters to Favourites
  const [fav, setFav] = useState([]);
  /// collect id of characters
  const [favsId, setFavsId] = useState([]);
  function addToFav(id) {
    if (!fav.includes(id)) {
      setFavsId([...favsId, id]);
      characters.map((item) => item.id === id && setFav([...fav, item]));
    }
  }

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
