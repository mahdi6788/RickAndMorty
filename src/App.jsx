import "./App.css";
import CharacterList from "./components/CharacterList";
import CharecterDetail from "./components/CharecterDetail";
import Navbar, { Favourites, Search, SearchResult } from "./components/Navbar";
import { allCharacters } from "../data/data";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import FavBar from "./components/FavBar";

function App() {
  const [query, setQuery] = useState(""); /// put this useState here in parant compo because we need the query here after setting in search component by setQuery.

  /// to determine which cahracter is selected, via Id
  const [character, setCharacter] = useState(null)
  const [selectedId, setSelectedId] = useState(null)
  const [episodes, setEpisodes] = useState([])
  async function handlerCharacter(id){
    try {
      setSelectedId(id)

      if (character!== null && character.id === id){
        return(
          setCharacter(null),
          setSelectedId(null)
        )
      }  
      
      const selectedCharacter = await axios.get(`https://rickandmortyapi.com/api/character/${id}`)
      setCharacter(selectedCharacter.data)

      const episodeIds =  selectedCharacter.data.episode.map(item => item.split("/").at(-1))
      const episodesInfo = await axios.get(`https://rickandmortyapi.com/api/episode/${episodeIds}`)
      // console.log(episodesInfo.data)
      setEpisodes([episodesInfo.data].flat()) /// remove brakets of object
      
    } catch (error) {
      toast(error.message)
    }
  }


  /// we need to put charecters state into App compo because we need it for navbar as well.
  const [characters, setCharacters] = useState([]);
  /// depending on the condition we decide to use useEffect or event handler function
  /// 1st approach: useEffect to fetch data
  // useEffect(() => {
  //   fetch("https://rickandmortyapi.com/api/character")
  //     .then((res) => res.json())
  //     .then((data) => setCharacters(data.results));
  // }, []);

  /// // 2nd approach: event handler function (button) to fetch data
  // function fetchCharacter() {
  //   fetch("https://rickandmortyapi.com/api/character")
  //     .then((res) => res.json())
  //     .then((data) => setCharacters(data.results));
  // }

  // isLoading state and Loading component for showing message when user is waiting to fetch data from API
  const [isLoading, setIsLoading] = useState(false);
  /// use async await instead of then catch:
  /// first declare function fetchData
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       setIsLoading(true)
  //       const res = await fetch("https://rickandmortyapi.com/api/characters");
  //       if (!res.ok) throw new Error("Error")
  //       const data = await res.json();
  //       setCharacters(data.results);
  //       // setIsLoading(false)
  //     } catch (error) {
  //       // setIsLoading(false)
  //       // console.log(error.message)
  //       toast.error(error.message)   /// display error as a toast
  //     } finally{
  //       setIsLoading(false)
  //     }
  //   }
  //   // then call that function
  //   fetchData();
  // }, []);

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
    // then call that function
    fetchData();
  }, [query]); /// we should put the state into [] to run effect function after changing this state

  const numOfResult = characters.length;

  /// add to Favourites
  const [fav, setFav] = useState([])
  const numOfFav = fav.length
  function addToFav(id){
    if (!fav.includes(id)) return setFav([...fav,id])
  }

  const[favBar,setFavBar] = useState(false)
  function onFavBar (){
    setFavBar(!favBar)
  }


  return (
    <div className="app">
      <Toaster />
      {/* use component composition for navbar and use searchResult and Search as the children to prevent props drilling. */}
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={numOfResult} />
        <Favourites numOfFav={numOfFav} onFavBar={onFavBar}  />
      </Navbar>
      <FavBar characters={characters} favsId={fav} favBar={favBar} />
      {/* <button style={{ color: "red" }} onClick={fetchCharacter}>
        Load Charecters
      </button> */}
      <div className="main">
        <CharacterList characters={characters} isLoading={isLoading} handlerCharacter={handlerCharacter} selectedId={selectedId} />
        <CharecterDetail character={character} episodes={episodes} addToFav={addToFav}/>
      </div>
    </div>
  );
}

export default App;
