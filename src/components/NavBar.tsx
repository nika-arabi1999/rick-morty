import { HeartIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { CharachtersContext } from "../App";
import { useCharactersContext } from "../contexts/CharactersContext";
export default function NavBar({ children }): any {
  return <div className="NavBar">{children}</div>;
}

export function LogoBox() {
  return (
    <div className="LogoBox">
      <img
        src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
        alt="logo"
      />
    </div>
  );
}

export function SearchBox({ setQuery }) {
  return (
    <div className="search-box">
      <div className="wrap">
        <div className="search">
          <input
            type="text"
            className="searchTerm"
            placeholder="search..."
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="searchButton">
            🔍
          </button>
        </div>
      </div>
    </div>
  );
}

export function ReasultsBox() {
  const {characters} = useCharactersContext();


  return (
    <div className="info-box">Found {`${characters.length}`} Reasults</div>
  );
}

export function FavBox({ favorites, setFavClose }) {
  return (
    <div className="FavBox">
      <div className="heart-icon" onClick={() => setFavClose(false)}>
        <HeartIcon className="favIcon" />
        <span className="heart-badge">{`${favorites.length}`}</span>
      </div>
    </div>
  );
}
