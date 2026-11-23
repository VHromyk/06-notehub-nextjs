import ReactPaginateImport from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import type { ComponentType } from "react";
import css from "./Pagination.module.css";

const ReactPaginate = ((ReactPaginateImport as unknown as { default?: unknown })
  .default ?? ReactPaginateImport) as ComponentType<ReactPaginateProps>;

interface PaginationProps {
  totalPages: number;
  page: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ totalPages, page, onPageChange }: PaginationProps) => {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      forcePage={page - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
};

export default Pagination;
