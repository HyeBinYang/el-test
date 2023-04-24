import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MusicsDispatchContext, MusicsStateContext, cachedMusics } from "../context/MusicsContext";
import axios from "axios";
import styled from "styled-components";
import dayjs from "dayjs";

const Wrapper = styled.div`
  width: 600px;
  margin: 120px auto 0;
`;

const MusicDetailTitle = styled.h1`
  font-size: 26px;
  line-height: 40px;
  margin-bottom: 20px;
  color: #2f2f2f;
`;

const MusicDetailGroup = styled.div`
  display: flex;
  column-gap: 25px;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  padding: 30px 0 30px 10px;

  .music-title {
    font-size: 22px;
    line-height: 30px;
    color: #2f2f2f;
    margin-bottom: 4px;
  }

  .artist {
    font-size: 18px;
    color: #3fd6f5;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const DescriptionGroup = styled.dl`
  margin-top: 14px;

  dt {
    float: left;
    padding-top: 6px;
    width: 60px;
    font-size: 14px;
    color: #888;
  }

  dd {
    padding-top: 6px;
    font-size: 14px;
    color: #606060;
  }
`;

const Detail = () => {
  const [music, setMusic] = useState<any>();
  const musics = useContext(MusicsStateContext);
  const dispatch = useContext(MusicsDispatchContext);
  const params = useParams();

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
    if (musics.length > 0) {
      setMusic(musics.filter((m) => m["id"]["attributes"]["im:id"] === params.id)[0]);
    }
  }, [musics]);

  if (!music) return null;

  return (
    <Wrapper>
      <MusicDetailTitle>음악 정보</MusicDetailTitle>
      <MusicDetailGroup>
        <div>
          <a href={music["link"]["attributes"]["href"]} target="_blank" rel="noreferrer">
            <img src={music["im:image"][2]["label"]} alt="" />
          </a>
        </div>
        <div style={{ flex: 1 }}>
          <p className="music-title">{music["im:name"]["label"]}</p>
          <a href={music["im:artist"]["attributes"]["href"]} target="_blank" rel="noreferrer" className="artist">
            {music["im:artist"]["label"]}
          </a>
          <DescriptionGroup>
            <dt>발매일</dt>
            <dd>{dayjs(music["im:releaseDate"]["label"]).format("YYYY.MM.DD")}</dd>
            <dt>장르</dt>
            <dd>{music["category"]["attributes"]["term"]}</dd>
            <dt>가격</dt>
            <dd>{music["im:price"]["label"]}</dd>
          </DescriptionGroup>
        </div>
      </MusicDetailGroup>
      <div></div>
    </Wrapper>
  );
};

export default Detail;
