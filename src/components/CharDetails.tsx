import { singleCharachter } from "../App";
import DetailInfo from "./DetailInfo";
import DetailEpisodes from "./DetailEpisodes";
export default function CharDetails({
  selectedItem,
  favorites,
  favoritesHandler,
}: {
  selectedItem: singleCharachter;
  favorites: singleCharachter[];
  favoritesHandler: (newFavItem: singleCharachter) => void;
}) {
  return (
    <div className="CharDetails">
      <DetailInfo
        selectedItem={selectedItem}
        favorites={favorites}
        favoritesHandler={favoritesHandler}
      />
      <DetailEpisodes selectedItem={selectedItem} />
    </div>
  );
}
