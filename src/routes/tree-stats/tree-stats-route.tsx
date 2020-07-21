import React, { useMemo, useState } from "react";
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

export const DataView: React.FC<{ data: Tree[] }> = ({ data }) => {
  const [filter, setFilter] = useState<{ startDate: Date; endDate: Date }>();
  const treesList = useMemo(() => selectTreeTotalsPerDay(data), [data]);

  const filteredTrees = useMemo(
    () => selectTreesFilterByDateRange(treesList, filter),
    [treesList, filter]
  );

  return (
    <div>
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
      <BarChart
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
