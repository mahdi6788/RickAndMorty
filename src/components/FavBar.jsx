import { useEffect, useState } from "react";
import axios from "axios";

export default function FavBar({ favsId, favBar }) {
  const [favorites, setFavorites] = useState(null);
  useEffect(() => {
    async function getFavs() {
      const res = await axios.get(
        `https://rickandmortyapi.com/api/character/${favsId}`
      );
      setFavorites([res.data]);
    }
    getFavs();
  }, [favsId]);

  return (
    <div className={`topBar ${favBar && "active"}`}>
      {favorites && favorites.length > 0 ? (
        favorites.map((fav,index) => {
          return (
            <div key={index}>
              <img src={fav.image} alt={fav.name} />
              <h3>
                <span>{fav.gender === "Male" ? "👨" : "👩"}</span>
                <span style={{ color: "white" }}> {fav.name}</span>
              </h3>
            </div>
          )
        })
      ) : (
        <p style={{ color: "white" }}>There is nothing</p>
      )}
    </div>
  );
}
