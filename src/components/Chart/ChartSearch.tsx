import React, { useContext, useRef } from "react";
import { MusicsDispatchContext } from "../../context/MusicsContext";
import styled from "styled-components";

const Wrapper = styled.form`
  width: 500px;
  height: 40px;
  margin: 60px auto 0;
  display: flex;
  column-gap: 4px;

  input {
    width: 440px;
    height: 100%;
    outline: none;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #666;
    border-radius: 6px;
  }

  button {
    width: 50px;
    height: 100%;
    background-color: #3fd6f5;
    color: #fff;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
  }
`;

const ChartSearch = () => {
  const inputEl = useRef<HTMLInputElement>(null);
  const dispatch = useContext(MusicsDispatchContext);

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

  return (
    <Wrapper onSubmit={handleSubmit}>
      <input type="text" ref={inputEl} placeholder="노래 제목 검색" />
      <button>검색</button>
    </Wrapper>
  );
};

export default ChartSearch;
