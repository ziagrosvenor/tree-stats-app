import groupBy from "lodash/groupBy";
import map from "lodash/map";
import parseISO from "date-fns/parseISO";
import isBefore from "date-fns/isBefore";
import isAfter from "date-fns/isAfter";
import format from "date-fns/format";
import { Tree } from "../../types/tree";

interface FormattedTree {
  date: string;
  value: number;
  key: string;
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
        key: date,
      };
    }
  ).sort((a: FormattedTree, b: FormattedTree) => {
    return isBefore(parseISO(a.date), parseISO(b.date)) ? -1 : 1;
  });
}

export function selectTreesFilterByDateRange(
  list: FormattedTree[],
  filter: any
): FormattedTree[] {
  return list.filter((item) => {
    if (filter) {
      const itemDate = parseISO(item.date);
      return (
        isBefore(itemDate, filter.endDate) &&
        isAfter(itemDate, filter.startDate)
      );
    }

    return item;
  });
}

export function formatDateString(dateString) {
  if (dateString) return format(parseISO(dateString), "MMM yy");
}
