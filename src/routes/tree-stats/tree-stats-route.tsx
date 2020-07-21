import React, { useMemo } from "react";
import { Error, LoadingIndicator, BarChart } from "../../components";
import { Tree } from "../../types/tree";
import { useTreesAPI } from "./use-trees-api";
import { selectTreeTotalsPerDay } from "./select-tree-totals-per-day";

export const DataView: React.FC<{ data: Tree[] }> = ({ data }) => {
  const treesList = useMemo(() => selectTreeTotalsPerDay(data), [data]);

  console.warn(treesList);
  return <BarChart data={treesList} />;
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
