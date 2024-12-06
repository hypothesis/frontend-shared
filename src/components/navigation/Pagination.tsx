import classnames from 'classnames';
import type { ComponentChildren } from 'preact';

import { paginationItems } from '../../util/pagination';
import { ArrowLeftIcon, ArrowRightIcon } from '../icons';
import Button from '../input/Button';

type NavigationButtonProps = {
  children: ComponentChildren;
  invisible?: boolean;
  onClick: (e: MouseEvent) => void;
  pressed?: boolean;
  title?: string;
};

function NavigationButton({
  children,
  invisible = false,
  pressed = false,
  onClick,
  title,
}: NavigationButtonProps) {
  return (
    <Button
      classes={classnames(
        'px-3.5 py-2.5 gap-x-1',
        'font-semibold rounded',
        // These colors are the same as the "dark" variant of IconButton
        'text-grey-7 enabled:hover:text-grey-9 enabled:hover:bg-grey-3',
        'disabled:text-grey-5 aria-pressed:bg-grey-3 aria-expanded:bg-grey-3',

        // Disabled navigation buttons are rendered as invisible and disabled
        // rather than removed so that the overall width of the component and
        // positions of child controls doesn't change too much when navigating
        // between pages.
        invisible && 'invisible',
      )}
      disabled={invisible}
      onClick={onClick}
      pressed={pressed}
      size="custom"
      title={title}
      variant="custom"
    >
      {children}
    </Button>
  );
}

export type PaginationProps = {
  /** 1-indexed page number of currently-visible page of results */
  currentPage: number;

  /**
   * Callback invoked when the user clicks a navigation button to change the
   * current page.
   */
  onChangePage: (page: number) => void;

  /** The total number of available pages. */
  totalPages: number;
};

/**
 * Render controls for navigating between pages in a paginated list of items.
 *
 * Buttons corresponding to nearby pages are shown on wider screens; for narrow
 * screens only Prev and Next buttons are shown.
 */
export default function Pagination({
  currentPage,
  onChangePage,
  totalPages,
}: PaginationProps) {
  // Pages are 1-indexed
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;
  const pageNumbers = paginationItems(currentPage, totalPages);

  const changePageTo = (pageNumber: number, element: HTMLElement) => {
    onChangePage(pageNumber);
    // Because changing pagination page doesn't reload the page (as it would
    // in a "traditional" HTML context), the clicked-upon navigation button
    // will awkwardly retain focus unless it is actively removed.
    // TODO: Evaluate this for a11y issues
    element.blur();
  };

  return (
    <div
      className="flex items-center text-md select-none"
      data-testid="pagination-navigation"
    >
      <div className="mr-2">
        <NavigationButton
          invisible={!hasPreviousPage}
          title="Go to previous page"
          onClick={e => changePageTo(currentPage - 1, e.target as HTMLElement)}
        >
          <ArrowLeftIcon />
          prev
        </NavigationButton>
      </div>
      <ul
        className={classnames(
          // Where there's enough horizontal space,
          // lay out page navigation buttons horizontally between prev/next:
          // | prevPage  |       numberedPages          | nextPage
          //
          // e.g.
          // | [<- prev] | [2] ... [5] [6] [7] ... [10] | [next ->] |
          //
          // These page buttons are hidden on narrow screens
          'hidden',
          // For slightly wider screens, they are shown in a horizontal row
          'md:flex md:items-center md:justify-center md:gap-x-2',
          // when visible, this element should stretch to fill available space
          'md:grow',
        )}
      >
        {pageNumbers.map((page, idx) => (
          <li key={idx}>
            {page === null ? (
              // Indicator for elided pages. Should be approximately the same
              // width as a small page number. This reduces the variation of
              // the component's width as the current page is advanced.
              //
              // Navigation buttons have `px-3.5`. This uses `px-3` since
              // an ellipsis is slightly wider than a digit.
              <div className="px-3 text-center" data-testid="pagination-gap">
                …
              </div>
            ) : (
              <NavigationButton
                key={`page-${idx}`}
                title={`Go to page ${page}`}
                pressed={page === currentPage}
                onClick={e => changePageTo(page, e.target as HTMLElement)}
              >
                {page.toString()}
              </NavigationButton>
            )}
          </li>
        ))}
      </ul>
      <div
        className={classnames(
          'ml-2 flex justify-end',
          // When page buttons are not shown, this element should grow to fill
          // available space. But when page buttons are shown, it should not.
          'grow md:grow-0',
        )}
      >
        <NavigationButton
          invisible={!hasNextPage}
          title="Go to next page"
          onClick={e => changePageTo(currentPage + 1, e.target as HTMLElement)}
        >
          next
          <ArrowRightIcon />
        </NavigationButton>
      </div>
    </div>
  );
}
