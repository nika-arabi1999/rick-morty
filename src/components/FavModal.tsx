import { XCircleIcon } from "@heroicons/react/24/outline";
import { CharItem } from "./CharItems";
import { TrashIcon } from "@heroicons/react/24/outline";
export default function FavModal({
  favClose,
  setFavClose,
  favorites,
  setFavorites,
  removeFavoritesHandler,
}) {
  return (
    <div className={`${favClose ? "hidden" : ""}  FavModal`}>
      <div className="backdrop" onClick={() => setFavClose(true)}></div>
      <div className="fav-container">
        <div className="fav-header">
          <h3 className="fav-haeder-title">Your Favorites:</h3>
          <div className="fav-close-btn" onClick={() => setFavClose(true)}>
            <XCircleIcon />
          </div>
        </div>
        <ul className="fav-list">
          {favorites.map((favorite) => {
            return (
              <CharItem
                key={favorite.id}
                result={favorite}
                actionButton={
                  <div className="char-btn item-trash">
                    <TrashIcon
                      className=" trash-icon"
                      onClick={() => removeFavoritesHandler(favorite.id)}
                    />
                  </div>
                }
              />
            );
          })}
        </ul>
        <div className="CharFavBtn">
          <button className="button-44" onClick={() => setFavorites([])}>
            <TrashIcon style={{ width: "30px" }} />
            Remove All
          </button>
        </div>
      </div>
    </div>
  );
}
