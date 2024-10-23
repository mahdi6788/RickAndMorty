import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


function useCharacters(query){
    const [characters, setCharacters] = useState([]);
    /// To display message when waiting to fetch data from API
    const [isLoading, setIsLoading] = useState(false);

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
    

    return {characters, isLoading}
}


export default useCharacters