import { HeartIcon } from "@heroicons/react/24/outline";

function Navbar({ children }) {
  return (
    <nav className="navbar">
      <Nav />
      {children}
    </nav>
  );
}

export default Navbar;

// separate to local functions
function Nav() {
  return <div className="navbar__logo">Logo😍</div>;
}

export function Search({ query, setQuery }) {
  return (
    <input
      value={query}
      onChange={(event) => setQuery(event.target.value)}
      className="text-field"
      type="text"
      placeholder="search..."
    />
  );
}

export function SearchResult({ numOfResult }) {
  return <div className="navbar__result">found {numOfResult} results</div>;
}

export function Favourites({numOfFav}) {
  return (
    <button className="heart">
      <HeartIcon className="icon" />
      <span className="badge" style={{color: "white"}}>{numOfFav}</span>
    </button>
  );
}
