/**
 * The number of an available pagination page, or `null`, indicating a gap
 * between sequential numbered pages.
 */
type PageNumber = number | null;

type ElidedRange = {
  /** Position of elided range item. */
  index: number;
  /** Number of items in this elided range. */
  count: number;
  /** Next value to consume from this elided range. */
  value: number;
};

export type Options = {
  /**
   * Number of pages to display at the start and end, including the start/end
   * page.
   *
   * This must be >= 1.
   */
  boundaryCount?: number;

  /**
   * Number of pages to display before and after the current page.
   */
  siblingCount?: number;
};

/**
 * Determine the set of (pagination) page numbers that should be provided to
 * a user.
 *
 * The result includes a mixture of page numbers that should be shown, plus
 * `null` values indicating elided page numbers. The goals of the selection
 * are:
 *
 * - To always provide page numbers for the first, last and current pages.
 *   Additional adjacent pages are provided according to the `boundaryCount`
 *   and `siblingCount` options.
 * - To try and keep the number of pagination items consistent as the current
 *   page changes. If each item is rendered with approximately the same width,
 *   this keeps the overall width of the pagination component and the location
 *   of child controls consistent as the user navigates. This helps to avoid
 *   mis-clicks due to controls moving around under the cursor.
 *
 * @param currentPage - The 1-based currently-visible/-active page number.
 * @param totalPages - The total number of pages
 * @param options - Options for the number of pages to show at the boundary and
 *   around the current page.
 */
export function paginationItems(
  currentPage: number,
  totalPages: number,
  /* istanbul ignore next */
  { boundaryCount = 1, siblingCount = 1 }: Options = {},
): PageNumber[] {
  if (totalPages <= 1) {
    return [];
  }

  currentPage = Math.max(1, Math.min(currentPage, totalPages));
  boundaryCount = Math.max(boundaryCount, 1);
  siblingCount = Math.max(siblingCount, 0);

  const pageNumbers: PageNumber[] = [];
  const beforeCurrent = currentPage - 1;
  const afterCurrent = totalPages - currentPage;

  const elideBeforeCurrent = boundaryCount + siblingCount < beforeCurrent;
  let elideBefore: ElidedRange | null = null;

  if (elideBeforeCurrent) {
    for (let page = 1; page <= boundaryCount; page++) {
      pageNumbers.push(page);
    }

    elideBefore = {
      index: pageNumbers.length,
      count: currentPage - siblingCount - boundaryCount,
      // Last value in elided range, as we expand backwards
      value: currentPage - siblingCount - 1,
    };
    pageNumbers.push(null);

    for (let page = currentPage - siblingCount; page < currentPage; page++) {
      pageNumbers.push(page);
    }
  } else {
    for (let page = 1; page < currentPage; page++) {
      pageNumbers.push(page);
    }
  }

  pageNumbers.push(currentPage);

  const elideAfterCurrent = boundaryCount + siblingCount < afterCurrent;
  let elideAfter: ElidedRange | null = null;

  if (elideAfterCurrent) {
    for (
      let page = currentPage + 1;
      page <= currentPage + siblingCount;
      page++
    ) {
      pageNumbers.push(page);
    }

    elideAfter = {
      index: pageNumbers.length,
      count: totalPages - boundaryCount + 1 - (currentPage + siblingCount),
      // First value in elided range, as we expand forwards
      value: currentPage + siblingCount + 1,
    };
    pageNumbers.push(null);

    for (
      let page = totalPages - boundaryCount + 1;
      page <= totalPages;
      page++
    ) {
      pageNumbers.push(page);
    }
  } else {
    for (let page = currentPage + 1; page <= totalPages; page++) {
      pageNumbers.push(page);
    }
  }

  // Calculate the maximum number of items we will show for the total number
  // of pages and options.
  const maxItems = Math.min(
    // First and last pages
    2 * boundaryCount +
      // Pages adjacent to current page
      2 * siblingCount +
      // Current page, indicators for elided pages before and after current.
      3,
    totalPages,
  );

  // To keep the number of items consistent as the current page changes,
  // expand the elided ranges until we reach the maximum.
  while (
    pageNumbers.length < maxItems &&
    (elideAfter?.count || elideBefore?.count)
  ) {
    if (elideAfter && elideAfter.count > 0) {
      // Expand ahead of current page if possible, starting with numbers closest
      // to current page.
      pageNumbers.splice(elideAfter.index, 0, elideAfter.value);
      ++elideAfter.index;
      ++elideAfter.value;
      --elideAfter.count;
    } else if (elideBefore) {
      // Otherwise expand behind, starting with numbers closest to current page.
      pageNumbers.splice(elideBefore.index + 1, 0, elideBefore.value);
      --elideBefore.value;
      --elideBefore.count;
    }
  }

  return pageNumbers;
}
