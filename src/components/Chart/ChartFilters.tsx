import React, { useContext, useMemo, useState } from "react";
import { MusicsDispatchContext, Sort } from "../../context/MusicsContext";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  column-gap: 8px;
  margin-top: 60px;

  button {
    padding: 6px 12px;
    border: 1px solid #b2b2b2;
    border-radius: 20px;
    background-color: #fff;
    color: #606060;
    cursor: pointer;

    &.active {
      color: #3fd6f5;
      border-color: #3fd6f5;
    }
  }
`;

const ChartFilters = () => {
  const [currentSort, setCurrentSort] = useState<Sort | null>(null);
  const dispatch = useContext(MusicsDispatchContext);

  const handleClickSort = (sort: Sort | null) => () => {
    if (dispatch) {
      dispatch({
        type: "SORT_MUSICS",
        payload: {
          sort,
        },
      });
    }
    setCurrentSort(sort);
  };

  return (
    <Wrapper>
      <button className={currentSort === null ? "active" : ""} onClick={handleClickSort(null)}>
        랭킹순
      </button>
      <button className={currentSort === "ASC" ? "active" : ""} onClick={handleClickSort("ASC")}>
        오름차순
      </button>
      <button className={currentSort === "DESC" ? "active" : ""} onClick={handleClickSort("DESC")}>
        내림차순
      </button>
    </Wrapper>
  );
};

export default ChartFilters;
