import {
  EyeIcon,
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { singleCharachter } from "../App";
import { useCharactersContext } from "../contexts/CharactersContext";

export default function CharItems({
  setSelectedItem,
  selectedItem,
}: {
  setSelectedItem: React.Dispatch<React.SetStateAction<singleCharachter>>;
  selectedItem: singleCharachter;
}) {
  const [showMore, setShowMore] = useState(false);
  const { characters } = useCharactersContext();

  const charactersData = showMore ? characters : characters.slice(0, 5);

  return (
    <div className="CharItems">
      {charactersData.map((result) => (
        <CharItem
          key={result.id}
          extraClassName={selectedItem.id == result.id ? "activeItem" : ""}
          result={result}
          actionButton={
            <div className="char-btn item-eye">
              <EyeIcon
                className=" eye-icon"
                onClick={() => setSelectedItem(result)}
              />
            </div>
          }
        />
      ))}
      <ShowMoreOrLess showMore={showMore} setShowMore={setShowMore} />
    </div>
  );
}

export function CharItem({
  extraClassName,
  result,
  actionButton,
}: {
  extraClassName?: string;
  result: singleCharachter;
  actionButton: React.ReactNode;
}) {
  return (
    <div className={` ${extraClassName} CharItem`}>
      <div className="item-img">
        <img src={`${result.image}`} alt="logo" />
      </div>
      <div className="item-data">
        <span className="result-name">
          {result.gender === "Male" ? "👨🏻" : "👩🏻"} {`${result.name}`}
        </span>
        <span className="result-status">
          <span
            className={`${result.status === "Alive" ? "green" : "red"}`}
          ></span>
          <span>
            {result.status} - {result.species}
          </span>
        </span>
      </div>
      {actionButton}
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
          style={{ width: "60px", height: "60px" }}
          onClick={() => setShowMore(true)}
        >
          {/* <span>More characters</span> */}
          <ChevronDoubleDownIcon />
        </button>
      ) : (
        <button
          className="show-more-btn"
          style={{ width: "60px", height: "60px" }}
          onClick={() => setShowMore(false)}
        >
          {/* <span>More characters</span> */}
          <ChevronDoubleUpIcon />
        </button>
      )}
    </div>
  );
}
