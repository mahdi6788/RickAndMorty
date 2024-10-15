import { HeartIcon } from "@heroicons/react/24/outline";

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar__logo">Logo😍</div>

      <input type="text" placeholder="search..." />
      <p className="navbar__result">found X results</p>

      <div className="heart">
        <HeartIcon className="icon" />
        <span className="badge">4</span>
      </div>
    </div>
  );
}

export default Navbar;
