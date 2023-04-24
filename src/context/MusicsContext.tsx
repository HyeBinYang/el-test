import { Dispatch, ReactNode, createContext, useReducer } from "react";

type Musics = any[];

export let cachedMusics: Musics = [];

export const MusicsStateContext = createContext<Musics>([]);

export type Sort = "ASC" | "DESC";
type Action =
  | { type: "GET_MUSICS"; payload: { musics: Musics } }
  | { type: "SORT_MUSICS"; payload: { sort: Sort | null } }
  | { type: "SEARCH_MUSIC"; payload: { keyword: string } };
type MusicsDispatch = Dispatch<Action>;

export const MusicsDispatchContext = createContext<MusicsDispatch | undefined>(undefined);

const musicsReducer = (state: Musics, actions: Action) => {
  switch (actions.type) {
    case "GET_MUSICS": {
      cachedMusics = [...actions.payload.musics];
      return actions.payload.musics;
    }
    case "SORT_MUSICS": {
      if (actions.payload.sort === "DESC") {
        state.sort((a, b) => {
          if (a["im:name"]["label"].toLowerCase() > b["im:name"]["label"].toLowerCase()) return -1;
          if (a["im:name"]["label"].toLowerCase() < b["im:name"]["label"].toLowerCase()) return 1;
          return 0;
        });
        return [...state];
      } else if (actions.payload.sort === "ASC") {
        state.sort((a, b) => {
          if (a["im:name"]["label"].toLowerCase() > b["im:name"]["label"].toLowerCase()) return 1;
          if (a["im:name"]["label"].toLowerCase() < b["im:name"]["label"].toLowerCase()) return -1;
          return 0;
        });
        return [...state];
      } else {
        return [...cachedMusics];
      }
    }
    case "SEARCH_MUSIC": {
      return state.filter((music) => music["im:name"]["label"].toLowerCase().includes(actions.payload.keyword));
    }
    default:
      return state;
  }
};

export const MusicsProvider = ({ children }: { children: ReactNode }) => {
  const [musics, dispatch] = useReducer(musicsReducer, []);

  return (
    <MusicsDispatchContext.Provider value={dispatch}>
      <MusicsStateContext.Provider value={musics}>{children}</MusicsStateContext.Provider>
    </MusicsDispatchContext.Provider>
  );
};
