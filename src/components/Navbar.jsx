import { HeartIcon } from "@heroicons/react/24/outline";

function Navbar({numOfResult}) {
  return (
    <nav className="navbar">
      <div className="navbar__logo">Logo😍</div>
      <input className="text-field" type="text" placeholder="search..." />
      <div className="navbar__result">found {numOfResult} results</div>
      <button className="heart">
        <HeartIcon className="icon" />
        <span className="badge">4</span>
      </button>
    </nav>
  );
}

export default Navbar;
