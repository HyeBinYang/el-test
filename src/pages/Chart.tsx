import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Link, useLocation, useParams, useSearchParams } from "react-router-dom";
import { MusicsDispatchContext, MusicsStateContext, Sort } from "../context/MusicsContext";
import queryString from "query-string";

const Chart = () => {
  const musics = useContext(MusicsStateContext);
  const dispatch = useContext(MusicsDispatchContext);
  const [searchParams] = useSearchParams();
  const values = queryString.parse(searchParams.toString());

  const fetchChart = () => {
    console.log(values);
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

  useEffect(() => {
    fetchChart();
  }, []);

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: "SORT_MUSICS",
        payload: {
          sort: values.sort as Sort,
        },
      });
    }
  }, [values]);

  console.log(musics);

  return (
    <div>
      <form>
        <input type="text" />
        <button>검색</button>
      </form>
      <div>
        <Link to={"/chart?sort=ASC"}>오름차순</Link>
        <Link to={"/chart?sort=DESC"}>내림차순</Link>
      </div>
      <ol>
        {musics.map((music, index) => (
          <li key={music["id"]["attributes"]["im:id"]}>{music["im:name"]["label"]}</li>
        ))}
      </ol>
    </div>
  );
};

export default Chart;
