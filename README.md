Notes:
1. when we need a state in more than one component, we define the state and setState on the parent component to pass them to the relavant components: e.g. query, characters,...

2. fetch data: 1: fetch(API), 2: axios.get(API)
  depending on the condition we decide to use useEffect or event handler function. 
  1st approach: useEffect to fetch data
  useEffect(() => {
     fetch("https://rickandmortyapi.com/api/character")
       .then((res) => res.json())
       .then((data) => setCharacters(data.results));
    }, []);

  2nd approach: event handler function (button) to fetch data
   function fetchCharacter() {
     fetch("https://rickandmortyapi.com/api/character")
       .then((res) => res.json())
       .then((data) => setCharacters(data.results));
   }

3. use async await instead of then catch:
   first declare function fetchData
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
        // console.log(error.message)
        toast.error(error.message)   /// display error as a toast
      } finally{
        setIsLoading(false)
      }
    }
    // then call that function
    fetchData();
  }, []);

4. useEffect(
    effect function,
    clean up function,
    dependencies
)
4.1. use async-await in useEffect 
useEffect(()=>{
    async function effectFunction () => {
        await ...
    } 
    effectFunction
},
return cleanupFunction,
[dependencies]
)
** puting the dependencies (state) into [] runs the effect function after changing the state, and renders the useEffect.

5. use component composition for navbar and use searchResult and Search as the children to prevent props drilling.