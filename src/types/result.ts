interface ResultLoading {
  status: "loading";
}
interface ResultSuccess<T> {
  status: "success";
  data: T;
}
interface ResultError {
  status: "error";
  error: Error;
}
export type Result<T> = ResultLoading | ResultSuccess<T> | ResultError;
