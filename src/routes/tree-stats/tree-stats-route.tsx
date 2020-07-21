import React, { useMemo } from "react";
import { Error, LoadingIndicator } from "../../components";
import { Tree } from "../../types/tree";
import { useTreesAPI } from "./use-trees-api";
import { selectTreeTotalsPerDay } from "./select-tree-totals-per-day";

export const DataView: React.FC<{ data: Tree[] }> = ({ data }) => {
  const treesList = useMemo(() => selectTreeTotalsPerDay(data), [data]);

  console.warn(treesList);
  return <div></div>;
};

export const TreeStatsRoute: React.FC<{}> = () => {
  const [result] = useTreesAPI();

  // if (result.status === "success") {
  //   console.warn("foo");
  //   console.warn("RESULT", convertToTotalValuesPerDayList(result.data));
  // }

  return (
    <div>
      {result.status === "loading" && <LoadingIndicator />}
      {result.status === "error" && <Error message={result.error.toString()} />}
      {result.status === "success" && <DataView data={result.data} />}
    </div>
  );
};
