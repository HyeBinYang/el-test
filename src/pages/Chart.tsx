import React from "react";
import ChartSearch from "../components/Chart/ChartSearch";
import ChartFilters from "../components/Chart/ChartFilters";
import ChartList from "../components/Chart/ChartList";

const Chart = () => {
  return (
    <div>
      <ChartSearch />
      <ChartFilters />
      <ChartList />
    </div>
  );
};

export default Chart;
