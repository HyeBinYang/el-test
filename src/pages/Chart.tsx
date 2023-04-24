import React, { useContext, useEffect, useRef } from "react";
import axios from "axios";
import { MusicsDispatchContext, MusicsStateContext, Sort } from "../context/MusicsContext";

const Chart = () => {
  const musics = useContext(MusicsStateContext);
  const dispatch = useContext(MusicsDispatchContext);
  const inputEl = useRef<HTMLInputElement>(null);

  const fetchChart = () => {
    axios
      .get("https://itunes.apple.com/us/rss/topalbums/limit=100/json") //
      .then((res) => {
        if (dispatch) {
          dispatch({
            type: "GET_MUSICS",
            payload: {
              musics: res.data.feed.entry,
            },
          });
        }
      });
  };

  const handleClickSort = (sort: Sort | null) => () => {
    if (dispatch) {
      dispatch({
        type: "SORT_MUSICS",
        payload: {
          sort,
        },
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!inputEl.current?.value) return;

    e.preventDefault();

    if (dispatch) {
      dispatch({
        type: "SEARCH_MUSIC",
        payload: {
          keyword: inputEl.current.value,
        },
      });
    }
  };

  useEffect(() => {
    fetchChart();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={inputEl} />
        <button>검색</button>
      </form>
      <div>
        <button onClick={handleClickSort(null)}>랭킹순</button>
        <button onClick={handleClickSort("ASC")}>오름차순</button>
        <button onClick={handleClickSort("DESC")}>내림차순</button>
      </div>
      <ol>
        {musics.map((music) => (
          <li key={music["id"]["attributes"]["im:id"]}>{music["im:name"]["label"]}</li>
        ))}
      </ol>
    </div>
  );
};

export default Chart;
