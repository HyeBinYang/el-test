import { Dispatch, ReactNode, createContext, useMemo, useReducer, useState } from "react";

type Musics = any[];

export const MusicsStateContext = createContext<Musics>([]);

export type Sort = "ASC" | "DESC";
type Action = { type: "GET_MUSICS"; payload: { musics: Musics } } | { type: "SORT_MUSICS"; payload: { sort: Sort } };
type MusicsDispatch = Dispatch<Action>;

export const MusicsDispatchContext = createContext<MusicsDispatch | undefined>(undefined);

const musicsReducer = (state: Musics, actions: Action) => {
  switch (actions.type) {
    case "GET_MUSICS": {
      console.log(actions.payload);
      return actions.payload.musics;
    }
    case "SORT_MUSICS": {
      if (actions.payload.sort === "DESC") {
        return state.sort((a, b) => {
          if (a["im:name"]["label"] > b["im:name"]["label"]) return -1;
          if (a["im:name"]["label"] < b["im:name"]["label"]) return 1;
          return 0;
        });
      } else if (actions.payload.sort === "ASC") {
        return state.sort((a, b) => {
          if (a["im:name"]["label"] > b["im:name"]["label"]) return 1;
          if (a["im:name"]["label"] < b["im:name"]["label"]) return -1;
          return 0;
        });
      } else {
        return state;
      }
    }
    default:
      return state;
  }
};

export const MusicsProvider = ({ children }: { children: ReactNode }) => {
  const [musics, dispatch] = useReducer(musicsReducer, []);

  return (
    <MusicsDispatchContext.Provider value={dispatch}>
      <MusicsStateContext.Provider value={musics}>{children}</MusicsStateContext.Provider>;
    </MusicsDispatchContext.Provider>
  );
};
