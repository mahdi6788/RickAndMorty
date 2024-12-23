import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
} from "@heroicons/react/16/solid";
import { useState } from "react";

function CharecterDetail({ character, episodes, addToFav }) {
  if (character === null) {
    return (
      <div style={{ flex: 1, color: "white" }}>There is nothing to show</div>
    );
  }

  /// Sort
  const [sortBy, setSortBy] = useState(true);

  /// use sortedEpisodes instead of episodes. because we cannot mutate it directly unless by setState
  let sortedEpisodes;
  if (sortBy) {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(a.created) - new Date(b.created)
    );
  } else {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );
  }

  return (
    <div className="charDetails">
      <CharacterDetails character={character} addToFav={addToFav} />
      <CharacterEpisodes
        setSortBy={setSortBy}
        sortBy={sortBy}
        sortedEpisodes={sortedEpisodes}
      />
    </div>
  );
}

export default CharecterDetail;


function CharacterDetails({ character, addToFav }) {
  return (
    <div className="character-detail">
      <img
        src={character.image}
        alt={character.name}
        className="character-detail__img"
      />
      <div className="character-detail__info">
        <h3 className="name">
          <span>{character.gender === "Male" ? "👨" : "👩"}</span>
          <span> {character.name}</span>
        </h3>
        <div className="info">
          <span
            className={`status ${character.status === "Dead" && "red"}`}
          ></span>
          <span> {character.status}</span>
          <span> - {character.species}</span>
        </div>
        <div className="location">
          <p>Last known location:</p>
          <p>{character.location.name}</p>
        </div>
        <div className="actions">
          <button
            className="btn btn--primary"
            onClick={() => addToFav(character.id)}
          >
            Add to Favourit
          </button>
        </div>
      </div>
    </div>
  );
}

function CharacterEpisodes({ setSortBy, sortBy, sortedEpisodes }) {
  return (
    <div className="character-episodes">
      <div className="title">
        <h2>List of Episodes</h2>
        <button onClick={() => setSortBy(!sortBy)}>
          {sortBy ? (
            <ArrowDownCircleIcon className="icon" />
          ) : (
            <ArrowUpCircleIcon className="icon" />
          )}
        </button>
      </div>
      <ul>
        {sortedEpisodes === null ? (
          <p>Select a charecter first</p>
        ) : (
          sortedEpisodes.map((item, index) => (
            <li key={item.id}>
              <div>
                {String(index + 1).padStart(2, "0")} {item.episode} :
                <strong>{item.name}</strong>
              </div>
              <div className="badge badge--secondary">{item.air_date}</div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
