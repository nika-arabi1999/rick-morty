import {
  ArrowUpCircleIcon,
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import { singleCharachter } from "../App";
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

function DetailInfo({
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

function DetailEpisodes({ selectedItem }: { selectedItem: singleCharachter }) {
  const [episodes, setEpisodes] = useState<any>([]);
  const [sort, setSort] = useState("earliest");
  const [showMore, setShowMore] = useState(false);
  const fetchEpisodes = async () => {
    const eps = selectedItem.episode
      .map((ep) => {
        return ep.split("/").at(-1);
      })
      .map((ep) => {
        return Number(ep);
      });
    const finalEpisodes = await axios.get(
      `https://rickandmortyapi.com/api/episode/${eps}`
    );
    setEpisodes(finalEpisodes.data);
  };
  useEffect(() => {
    fetchEpisodes();
    console.log(episodes);
  }, [selectedItem]);

  // const itemEpisodes = showMore ? episodes : episodes.slice(0, 3);
  let itemEpisodes;

  if (Array.isArray(episodes)) {
    itemEpisodes = showMore ? episodes : episodes.slice(0, 3);
  } else {
    itemEpisodes = episodes;
  }

  return (
    <div className="DetailEpisodes">
      <div className="ep-header">
        <h3 className="ep-header-title">List Of Episodes:</h3>
        <div
          className="sort-btn"
          onClick={() =>
            setSort((sort) => (sort === "earliest" ? "latest" : "earliest"))
          }
        >
          <ArrowUpCircleIcon
            className={`${sort === "earliest" ? "rotated" : ""} arrow`}
          />
        </div>
      </div>
      <div className="ep-body">
        <ul className="ep-list">
          {Array.isArray(itemEpisodes) ? (
            itemEpisodes
              .sort((a: any, b: any) => {
                if (sort === "earliest") {
                  return (
                    new Date(a.air_date).getTime() -
                    new Date(b.air_date).getTime()
                  );
                } else {
                  return (
                    new Date(b.air_date).getTime() -
                    new Date(a.air_date).getTime()
                  );
                }
              })
              .map((ep, index) => {
                return (
                  <li className="ep-list-item" key={ep.name}>
                    <span className="ep-title">{`${index + 1}-${
                      ep.name
                    }`}</span>
                    <span className="ep-date"> {`${ep.air_date}`}</span>
                  </li>
                );
              })
          ) : (
            <li className="ep-list-item">
              <span className="ep-title">
                {itemEpisodes.name ? `1-${itemEpisodes.name}` : ""}
              </span>
              <span className="ep-date">
                {" "}
                {itemEpisodes.air_date ? `${itemEpisodes.air_date}` : ""}
              </span>
            </li>
            // <span>"no episodes for this character!"</span>
          )}
        </ul>
      </div>
      <ShowMoreOrLess showMore={showMore} setShowMore={setShowMore} />
    </div>
  );
}

function ShowMoreOrLess({
  showMore,
  setShowMore,
}: {
  showMore: boolean;
  setShowMore: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="ShowMoreOrLess">
      {!showMore ? (
        <button
          className="show-more-btn"
          style={{ width: "40px", height: "40px" }}
          onClick={() => setShowMore(true)}
        >
          {/* <span>More characters</span> */}
          <ChevronDoubleDownIcon />
        </button>
      ) : (
        <button
          className="show-more-btn"
          style={{ width: "40px", height: "40px" }}
          onClick={() => setShowMore(false)}
        >
          {/* <span>More characters</span> */}
          <ChevronDoubleUpIcon />
        </button>
      )}
    </div>
  );
}
