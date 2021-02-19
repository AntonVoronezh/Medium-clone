import { parse as d } from "query-string";

export const range = (start: number, end: number): number[] => {
  return [...Array(end).keys()].map((el) => el + start);
};

export const limit = 10;

export const getPaginator = (search) => {
  const parsedSearch = d(search.search);
  const currentPage = parsedSearch.page ? Number(parsedSearch.page) : 1;
  const offset = currentPage * limit - limit;

  return { currentPage, offset };
};
