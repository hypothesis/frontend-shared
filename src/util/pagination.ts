/**
 * The number of an available pagination page, or `null`, indicating a gap
 * between sequential numbered pages.
 */
type PageNumber = number | null;

// Max items: 7 - start, elide, middle 3, elide, end
//
// 1:
// 2: 1 2
// 3: 1 2 3
// 4: 1 2 3 4
// 5: 1 2 3 4 5
// 6: 1 2 3 4 5 6
//
// With 8 total items.
//
// 1: 1 2 3 .. 6 7 8
// 2: 1 2 3 .. 6 7 8
// 3: 1 2 3 4 .. 7 8
// 4: 1 2 3 4 5 .. 8
// 5: 1 .. 4 5 6 .. 8
// 8: 1 .. 7 8
//

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
 * `null` values indicating elided page numbers. The returned set of pagination
 * items will always include the current page, the first and last
 * `boundaryCount` pages and `siblingCount` pages before and after the current
 * page. Additional page numbers may also be added to keep the number of
 * pagination items consistent regardless of the current page.
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

  // Index of indicator for pages elided before current.
  let elideBeforeIndex = null;
  // Number of last page elided before current.
  let elideBeforeValue = 1;

  // Add pages before current.
  const elideBeforeCurrent = boundaryCount + siblingCount < beforeCurrent;
  if (elideBeforeCurrent) {
    for (let page = 1; page <= boundaryCount; page++) {
      pageNumbers.push(page);
    }
    elideBeforeIndex = pageNumbers.length;
    elideBeforeValue = currentPage - siblingCount - 1;
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

  // Index of indicator for pages elided after current.
  let elideAfterIndex = null;
  // Number of first page elided after current.
  let elideAfterValue = currentPage;

  const elideAfterCurrent = boundaryCount + siblingCount < afterCurrent;
  if (elideAfterCurrent) {
    for (
      let page = currentPage + 1;
      page <= currentPage + siblingCount;
      page++
    ) {
      pageNumbers.push(page);
      elideAfterValue = page + 1;
    }
    elideAfterIndex = pageNumbers.length;
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
    2 * boundaryCount +
      2 * siblingCount +
      3 /* current page + 2 elide markers */,
    totalPages,
  );

  // To keep the number of items consistent as the current page changes,
  // expand the elided ranges until we reach the maximum.
  while (pageNumbers.length < maxItems) {
    if (elideAfterIndex !== null) {
      // Expand ahead of current page if possible, starting with numbers closest
      // to current page.
      pageNumbers.splice(elideAfterIndex, 0, elideAfterValue);
      ++elideAfterIndex;
      ++elideAfterValue;
    } else if (elideBeforeIndex !== null) {
      // Otherwise expand behind, starting with numbers closest to current page.
      pageNumbers.splice(elideBeforeIndex + 1, 0, elideBeforeValue);
      --elideBeforeValue;
    } else {
      break;
    }
  }

  return pageNumbers;
}
