import React from "react";
import { useMemo } from "react";
import { cn } from "../utils";
import { Button } from "./button";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { log } from "console";

export const DOTS = "...";

const range = (start: number, end: number) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

type UserPaginationProps = {
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
  currentPage: number;
};

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}: UserPaginationProps) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5;

    /*
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    /*
      We do not want to show dots if there is only one position left 
      after/before the left/right page count as that would lead to a change if our Pagination
      component size which we do not want
    */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};

type PaginationProps = {
  className?: string;
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
};

const Pagination = (props: PaginationProps) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || !paginationRange || paginationRange?.length < 2) {
    console.log(paginationRange);

    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange?.[paginationRange.length - 1];
  return (
    <ul className={cn("flex list-none gap-2", className)}>
      <Button
        variant={"outline"}
        className={cn("", {
          "pointer-events-none opacity-50": currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <ArrowLeftIcon className="w-4 h-4" />
      </Button>

      {paginationRange?.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return (
            <Button
              variant={"outline"}
              key={`${pageNumber}page`}
              className="pagination-item dots"
            >
              &#8230;
            </Button>
          );
        }

        return (
          <Button
            variant={pageNumber === currentPage ? "default" : "outline"}
            key={`${pageNumber}page`}
            className={cn("pagination-item", {
              selected: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(+pageNumber)}
          >
            {pageNumber}
          </Button>
        );
      })}
      <Button
        variant={"outline"}
        className={cn("pagination-item", {
          "pointer-events-none opacity-50": currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <ArrowRightIcon className="w-4 h-4" />
      </Button>
    </ul>
  );
};

export default Pagination;
