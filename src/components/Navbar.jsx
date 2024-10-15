import { HeartIcon } from "@heroicons/react/24/outline";

function Navbar({children}) {
  return (
    <nav className="navbar">
      <Nav />
      <Search />
      {children}
      <Favourites />
    </nav>
  );
}

export default Navbar;

// separate to local functions
function Nav(){
  return (
    <div className="navbar__logo">Logo😍</div>
  )
}

function Search(){
  return (
    <input className="text-field" type="text" placeholder="search..." />
  )
}

export function SearchResult({numOfResult}){
  return (
    <div className="navbar__result">found {numOfResult} results</div>
  )
}

function Favourites(){
  return (
    <button className="heart">
        <HeartIcon className="icon" />
        <span className="badge">4</span>
      </button>
  )
}