import { useEffect, useState } from "react";

function useLocalStorage(key, initialState){
  /// add characters to Favourites, load initial data from localStorage if it is empty, it return empty array 
  const [value, setValue] = useState(JSON.parse(localStorage.getItem(key)) || initialState);

    /// by changing the value as a dependency, localStorage save
    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(value))
    }, [value])

    return [value, setValue]
}

export default useLocalStorage