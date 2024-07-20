import { useEffect, useState } from "react";
import CharDetails from "./components/CharDetails";
import CharItems from "./components/CharItems";
import FavModal from "./components/FavModal";
import "./App.css";
import { LogoBox, SearchBox, ReasultsBox, FavBox } from "./components/NavBar";
import NavBar from "./components/NavBar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactLoading from "react-loading";
import useLocalStorage from "./hooks/useLocalStorage";
import { useCharactersContext } from "./contexts/CharactersContext";
// import { CharachtersContext } from "./contexts/CharactersContext";
type location = {
  name: string;
  url?: string;
};
export type singleCharachter = {
  created?: string;
  episode: string[];
  gender: string;
  id: number;
  image: string;
  location: location;
  name: string;
  origin?: location;
  species: string;
  status: string;
  type: string;
  url?: string;
};
const emptyChar = {
  id: 1000,
  image:
    "https://cdn.icon-icons.com/icons2/3297/PNG/512/user_profile_icon_208590.png",
  name: "Name",
  status: "status",
  species: "species",
  type: "type",
  gender: "Male",
  location: { name: "Location" },
  disabled: true,
};

function App() {
  // const [characters, setCharacters] = useState([]);
  // const { setCharacters } = useContext(CharachtersContext);
  const { dispatch } = useCharactersContext();
  const updateCharacters = (characters: singleCharachter[]) => {
    dispatch({ type: "UPDATE_CHARCTERS", payload: characters });
  };

  const [selectedItem, setSelectedItem] = useLocalStorage(
    "SELECTED_ITEM",
    emptyChar
  );
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useLocalStorage("FAVORITES", []);
  const [favClose, setFavClose] = useState(true);
  const favoritesHandler = (newFavItem: singleCharachter) => {
    const filteredFavorites = favorites.find(
      (f: singleCharachter) => f.id == newFavItem.id
    );
    if (!filteredFavorites) {
      setFavorites((prevFavorites: singleCharachter[]) => [
        ...prevFavorites,
        newFavItem,
      ]);
    }
  };
  const removeFavoritesHandler = (id: number) => {
    const newFavorites = favorites.filter((f: singleCharachter) => f.id !== id);
    setFavorites(newFavorites);
  };
  // fetch data
  const getAllCharacters = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://rickandmortyapi.com/api/character"
      );
      updateCharacters(response.data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getAllCharacters();
  }, []);

  const getSearchedCharacter = async (search: string) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/?name=${search}`
      );
      console.log(response);

      updateCharacters(response.data.results);
    } catch (error) {
      updateCharacters([]);
      toast.error("no results here!");
      // console.error("no results here!");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getSearchedCharacter(query);
  }, [query]);

  return (
    <div className="main">
      <NavBar>
        <LogoBox />
        <SearchBox setQuery={setQuery} />
        <ReasultsBox />
        <FavBox favorites={favorites} setFavClose={setFavClose} />
      </NavBar>
      <ToastContainer theme="dark" />
      <div className="Charachters">
        {!isLoading ? (
          <CharItems
            setSelectedItem={setSelectedItem}
            selectedItem={selectedItem}
          />
        ) : (
          <ReactLoading
            className="CharItems"
            type="spokes"
            color="#fc7676"
            height={"100px"}
            width={"500px"}
          />
        )}

        <CharDetails
          selectedItem={selectedItem}
          favorites={favorites}
          favoritesHandler={favoritesHandler}
        />
      </div>
      <FavModal
        setFavClose={setFavClose}
        favClose={favClose}
        favorites={favorites}
        setFavorites={setFavorites}
        removeFavoritesHandler={removeFavoritesHandler}
      />
    </div>
  );
}

export default App;
