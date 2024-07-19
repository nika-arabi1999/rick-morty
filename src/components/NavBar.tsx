import { HeartIcon } from "@heroicons/react/24/outline";
import { useCharactersContext } from "../contexts/CharactersContext";
import { ReactNode } from "react";
import { singleCharachter } from "../App";
export default function NavBar({ children }: { children: ReactNode }) {
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

export function SearchBox({
  setQuery,
}: {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
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
  const { characters } = useCharactersContext();

  return (
    <div className="info-box">Found {`${characters.length}`} Reasults</div>
  );
}

export function FavBox({
  favorites,
  setFavClose,
}: {
  favorites: singleCharachter[];
  setFavClose: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="FavBox">
      <div className="heart-icon" onClick={() => setFavClose(false)}>
        <HeartIcon className="favIcon" />
        <span className="heart-badge">{`${favorites.length}`}</span>
      </div>
    </div>
  );
}
