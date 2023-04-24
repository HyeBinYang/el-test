import React, { useContext, useEffect } from "react";
import { MusicsDispatchContext, MusicsStateContext, cachedMusics } from "../../context/MusicsContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import dayjs from "dayjs";

const MusicChartTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
  margin-bottom: 80px;

  th {
    height: 48px;
    vertical-align: middle;
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
    font-size: 14px;
    color: #606060;
  }

  td {
    vertical-align: middle;
    border-bottom: 1px solid #e5e5e5;
  }

  td.center {
    text-align: center;
  }

  tbody tr {
    height: 84px;
    font-size: 14px;
    cursor: pointer;

    &:hover {
      background-color: #eee;
    }
  }

  .release-date {
    color: #888;
  }
`;

const MusicInfoGroup = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;

  img {
    width: 60px;
    height: 60px;
  }

  .title {
    font-size: 16px;
    margin-bottom: 2px;
  }

  .artist {
    font-size: 14px;
    color: #969696;
  }
`;

const ChartList = () => {
  const navigate = useNavigate();
  const musics = useContext(MusicsStateContext);
  const dispatch = useContext(MusicsDispatchContext);

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

  useEffect(() => {
    if (!cachedMusics.length) fetchChart();
  }, []);

  return (
    <MusicChartTable>
      <thead>
        <tr>
          <th scope="col">순위</th>
          <th scope="col">곡정보</th>
          <th scope="col">발매일</th>
        </tr>
      </thead>
      <tbody>
        {musics.map((music, index) => (
          <tr key={music["id"]["attributes"]["im:id"]} onClick={() => navigate(`/detail/${music["id"]["attributes"]["im:id"]}`)}>
            <td className="center" width="50px">
              <span>{index + 1}</span>
            </td>
            <td>
              <MusicInfoGroup>
                <img src={music["im:image"][1]["label"]} alt="앨범" loading="lazy" />
                <div>
                  <p className="title">{music["im:name"]["label"]}</p>
                  <p className="artist">{music["im:artist"]["label"]}</p>
                </div>
              </MusicInfoGroup>
            </td>
            <td className="center" width="100px">
              <p className="release-date">{dayjs(music["im:releaseDate"]["label"]).format("YYYY.MM.DD")}</p>
            </td>
          </tr>
        ))}
      </tbody>
    </MusicChartTable>
  );
};

export default ChartList;
