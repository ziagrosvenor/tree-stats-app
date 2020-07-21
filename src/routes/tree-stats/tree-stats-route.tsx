import React, { useMemo } from "react";
import { Error, LoadingIndicator, BarChart } from "../../components";
import { Tree } from "../../types/tree";
import { useTreesAPI } from "./use-trees-api";
import { selectTreeTotalsPerDay, formatDateString } from "./selectors";

export const DataView: React.FC<{ data: Tree[] }> = ({ data }) => {
  const treesList = useMemo(() => selectTreeTotalsPerDay(data), [data]);

  console.warn(treesList);
  return (
    <BarChart data={treesList} formatKey={(key) => formatDateString(key)} />
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
