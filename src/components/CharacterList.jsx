import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import Loading from "./Loading";

function CharacterList({
  characters,
  isLoading,
  handlerCharacter,
  selectedId,
}) {
  if (isLoading) {
    return (
      <div className="characters-list">
        <Loading />
      </div>
    );
  }

  return (
    <div className="characters-list">
      {characters.map((item) => (
        <Character item={item} key={item.id}> 
          <button
            className="icon red"
            onClick={() => handlerCharacter(item.id)}
          >
            {selectedId === item.id ? <EyeIcon /> : <EyeSlashIcon />}
          </button>
        </Character>
      ))}
    </div>
  );
}

export default CharacterList;


//////// ******** ////////
/// Note 5.2
export function Character({ item, children }) {
  return (
    <div className="list__item">
      <img src={item.image} alt={item.name} />
      <CharacterName item={item} />
      <CharacterInfo item={item} />
      {children}
    </div>
  );
}

function CharacterName({ item }) {
  return (
    <h3 className="name">
      <span>{item.gender === "Male" ? "👨" : "👩"} </span>
      <span>{item.name}</span>
    </h3>
  );
}

function CharacterInfo({ item }) {
  return (
    <div className="list-item__info info">
      <span className={`status ${item.status === "Dead" && "red"}`}></span>
      <span> {item.status} </span>
      <span>- {item.species}</span>
    </div>
  );
}
