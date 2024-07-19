import {
  ArrowUpCircleIcon,
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import { singleCharachter } from "../App";
import EpisodesList from "./EpisodesList";
import ReactLoading from "react-loading";

export default function DetailEpisodes({
  selectedItem,
}: {
  selectedItem: singleCharachter;
}) {
  const [episodes, setEpisodes] = useState<any>([]);
  const [sort, setSort] = useState("earliest");
  const [showMore, setShowMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const fetchEpisodes = async () => {
    const eps = selectedItem.episode
      .map((ep) => {
        return ep.split("/").at(-1);
      })
      .map((ep) => {
        return Number(ep);
      });
    try {
      setIsLoading(true);
      const finalEpisodes = await axios.get(
        `https://rickandmortyapi.com/api/episode/${eps}`
      );
      setEpisodes(finalEpisodes.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }

  };
  useEffect(() => {
    fetchEpisodes();
    console.log(episodes);
  }, [selectedItem]);

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
        {isLoading ? (
          <ReactLoading
            className="CharItems"
            type="spokes"
            color="#fc7676"
            height={"50px"}
            width={"100%"}
          />
        ) : (
          <EpisodesList itemEpisodes={itemEpisodes} sort={sort} />
        )}
        {/* <EpisodesList itemEpisodes={itemEpisodes} sort={sort} /> */}
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
          <ChevronDoubleDownIcon />
        </button>
      ) : (
        <button
          className="show-more-btn"
          style={{ width: "40px", height: "40px" }}
          onClick={() => setShowMore(false)}
        >
          <ChevronDoubleUpIcon />
        </button>
      )}
    </div>
  );
}
