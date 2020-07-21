import React, { useMemo, useState } from "react";
import styled from "styled-components";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import { Error, LoadingIndicator, BarChart, Button } from "../../components";
import { Tree } from "../../types/tree";
import { useTreesAPI } from "./use-trees-api";
import {
  selectTreeTotalsPerDay,
  formatDateString,
  selectTreesFilterByDateRange,
} from "./selectors";

const FiltersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
`;

export const DataView: React.FC<{ data: Tree[] }> = ({ data }) => {
  const [filter, setFilter] = useState<{ startDate: Date; endDate: Date }>();
  const treesList = useMemo(() => selectTreeTotalsPerDay(data), [data]);

  const filteredTrees = useMemo(
    () => selectTreesFilterByDateRange(treesList, filter),
    [treesList, filter]
  );

  return (
    <div>
      <FiltersContainer>
        <Button
          unelevated
          label="Last Month"
          onClick={() => {
            const today = new Date();
            const lastMonth = new Date(today.setMonth(today.getMonth() - 1));
            setFilter({
              startDate: startOfMonth(lastMonth),
              endDate: endOfMonth(lastMonth),
            });
          }}
        />

        <Button
          unelevated
          label="Last 6 Months"
          onClick={() => {
            const today = new Date();
            const sixMonthsAgo = new Date(today.setMonth(today.getMonth() - 6));
            setFilter({
              startDate: startOfMonth(sixMonthsAgo),
              endDate: endOfMonth(new Date()),
            });
          }}
        />
      </FiltersContainer>

      <BarChart
        key={filter?.endDate.toDateString()}
        data={filteredTrees}
        formatKey={(key) => formatDateString(key)}
      />
    </div>
  );
};

export const TreeStatsRoute: React.FC<{}> = () => {
  const [result] = useTreesAPI();

  return (
    <div>
      {result.status === "loading" && <LoadingIndicator />}
      {result.status === "error" && <Error message={result.error.toString()} />}
      {result.status === "success" && <DataView data={result.data} />}
    </div>
  );
};
