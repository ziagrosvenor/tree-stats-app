import groupBy from "lodash/groupBy";
import map from "lodash/map";
import parseISO from "date-fns/parseISO";
import isBefore from "date-fns/isBefore";
import { Tree } from "../../types/tree";

interface FormattedTree {
  date: string;
  value: number;
}

function getTotalValue(list: Tree[]): number {
  return list.reduce((total, { value }) => value + total, 0);
}

export function selectTreeTotalsPerDay(list: Tree[]): FormattedTree[] {
  return map(
    groupBy(list, ({ createdAt }: Tree) => {
      return createdAt.split("T")[0];
    }),
    (value: Tree[], date: string) => {
      return {
        value: getTotalValue(value),
        date,
      };
    }
  ).sort((a: FormattedTree, b: FormattedTree) =>
    isBefore(parseISO(a.date), parseISO(b.date))
  );
}
