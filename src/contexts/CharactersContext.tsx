import React, { createContext, useContext, useReducer } from "react";
import { singleCharachter } from "../App";
type Action = { type: "UPDATE_CHARCTERS"; payload: singleCharachter[] } | { type: "UPDATE_FAVORITES"; payload: singleCharachter[] };

type CharactersContextType = {
  characters: singleCharachter[];
  favorites: singleCharachter[];
  dispatch: React.Dispatch<{
    type: "UPDATE_CHARCTERS";
    payload: singleCharachter[];
  }>;
};

const initialState = {
  characters: [],
  favorites : []
};

// Create the context
const CharactersContext = createContext<CharactersContextType | undefined>(
  undefined
);

// Create the context provider
const CharactersProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(characterReducer, initialState);

  return (
    <CharactersContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CharactersContext.Provider>
  );
};

const useCharactersContext = () => {
  const context = useContext(CharactersContext);
  if (context === undefined) {
    throw new Error(
      "useCharactersContext must be used within a CharactersProvider"
    );
  }
  return context;
};

const characterReducer = (
  state: typeof initialState,
  action: Action
): typeof initialState => {
  switch (action.type) {
    case "UPDATE_CHARCTERS":
      return { ...state, characters: action.payload as any };
      case "UPDATE_FAVORITES":
        return { ...state, favorites: action.payload as any };
    default:
      return state;
  }
};

export { CharactersProvider, useCharactersContext };
