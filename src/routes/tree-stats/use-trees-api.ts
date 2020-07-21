import { useState, useEffect } from "react";
import { Result } from "../../types/result";
import { Tree } from "../../types/tree";

const API_URL = "https://public.ecologi.com/trees";

export function useTreesAPI(): Result<Tree[]>[] {
  const [result, setResult] = useState<Result<Tree[]>>({
    status: "loading",
  });

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((response) => setResult({ status: "success", data: response }))
      .catch((error) => setResult({ status: "error", error }));
  }, []);

  return [result];
}
