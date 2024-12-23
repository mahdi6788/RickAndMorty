import { HeartIcon } from "@heroicons/react/24/outline";
import Modal from "./Modal";
import { useState } from "react";
import { Character } from "./CharacterList";
import { TrashIcon } from "@heroicons/react/16/solid";

function Navbar({ children }) {
  return (
    <nav className="navbar">
      {children}
    </nav>
  );
}

export default Navbar;

/// *** ///
export function Logo() {
  return (
    <img
      src="/logo.jpeg"
      alt="logo"
      style={{ width: "50px", borderRadius: "2rem", marginRight:"0.5rem" }}
    />
  );
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
  return <div className="navbar__result"> {numOfResult} results</div>;
}

export function Favourites({ fav, setFav }) {
  const [isOpen, setIsOpen] = useState(false);
  const onDeleteFav = (id) => {
    const filtered = fav.filter((item) => item.id !== id);
    setFav(filtered);
  };
  return (
    <>
      <Modal onOpen={setIsOpen} open={isOpen} title={"Favorites List"}>
        {fav.map((item) => (
          <Character item={item} key={item.id}>
            <button className="icon red" onClick={() => onDeleteFav(item.id)}>
              <TrashIcon /> {/* Note 5.2. */}
            </button>
          </Character>
        ))}
      </Modal>
      <button className="heart" onClick={() => setIsOpen(!isOpen)}>
        <HeartIcon className="icon" />
        <span className="badge" style={{ color: "white" }}>
          {fav.length}
        </span>
      </button>
    </>
  );
}
