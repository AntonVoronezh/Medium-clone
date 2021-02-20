import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import { range } from "../utils";

interface IProps {
  page: number;
  currentPage: number;
  url: string;
}

interface IPropsPaginator {
  currentPage: number;
  url: string;
  total: number;
  limit: number;
}

const PaginationItem = ({ page, currentPage, url }: IProps): JSX.Element => {
  const liClasses: string = classNames({
    "page-item": true,
    active: currentPage === page,
  });

  return (
    <li className={liClasses}>
      <Link to={`${url}?page=${page}`} className="page-link">
        {page}
      </Link>
    </li>
  );
};

export const Pagination = ({
  total,
  limit,
  url,
  currentPage,
}: IPropsPaginator): JSX.Element => {
  const pagesCount: number = Math.ceil(total / limit);
  const pages: number[] = range(1, pagesCount);

  return (
    <ul className="pagination">
      {pages.map(
        (page): JSX.Element => {
          return (
            <PaginationItem
              key={page}
              page={page}
              currentPage={currentPage}
              url={url}
            />
          );
        }
      )}
    </ul>
  );
};
