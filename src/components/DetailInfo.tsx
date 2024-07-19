import { singleCharachter } from "../App";

export default function DetailInfo({
  selectedItem,
  favorites,
  favoritesHandler,
}: {
  selectedItem: singleCharachter;
  favorites: singleCharachter[];
  favoritesHandler: (newFavItem: singleCharachter) => void;
}) {
  return (
    <div className="DetailInfo">
      <div className="detail-img">
        <img src={`${selectedItem?.image}`} alt="logo" />
      </div>
      <div className="detail-data">
        <div className="CharItem det">
          <div className="item-data">
            <span className="result-name">
              {selectedItem?.gender === "Male" ? "👨🏻" : "👩🏻"}{" "}
              {`${selectedItem?.name}`}
            </span>
            <span className="result-status">
              <span
                className={`${
                  selectedItem?.status === "Alive" ? "green" : "red"
                }`}
              ></span>
              <span>
                {selectedItem?.status} - {selectedItem?.species}
              </span>
            </span>
          </div>
        </div>
        <div className="CharLocation">
          <span style={{ fontWeight: "600" }}> Last Location:</span>
          <small>{`${selectedItem?.location?.name}`}</small>
        </div>
        <div className="CharFavBtn">
          {selectedItem.name === "Name" ? (
            ""
          ) : favorites.find(
              (favorite: singleCharachter) => favorite.id === selectedItem.id
            ) ? (
            <span className="CharFavBtn-added">Added To Favorites ♥️</span>
          ) : (
            <button
              className={"button-44"}
              onClick={() => favoritesHandler(selectedItem)}
            >
              ADD TO FAVORITES
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
