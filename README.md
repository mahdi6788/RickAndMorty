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

5. Usage of children:
5.1. component composition: Prevent from props drilling: when we separate a component to local (nested) functions, and the main component does not need props which are neccessary for one of the functions, so, use that function as a children inside the element of the parent component in the top component to pass that props to the children (function) directly. In this case we should write "export" before the function into the main component and import the function inside the top component. e.g. Navbar in App that has three child Search, SearchResult, Favourities.   
 
5.2.When some part of a component has global usage in differnt components and other parts are specific for that coponent, we can put the specif part onto the top coponent as children of the component inside the element. by doing this we can use the main component in other positions.  e.g. Character using in CharaterList component and Navbar component. 