import { useState } from 'preact/hooks';

import { Pagination } from '../../../../';
import Library from '../../Library';

export default function PaginationPage() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Library.Page
      title="Pagination"
      intro={
        <p>
          <code>Pagination</code> is a component that allows navigating between
          pages in a paginated set of items.
        </p>
      }
    >
      <Library.Section>
        <Library.Pattern>
          <Library.Usage symbolName="Pagination" />
          <Library.Example>
            <Library.Demo title="Basic usage" withSource>
              <Pagination
                currentPage={currentPage}
                totalPages={10}
                onChangePage={page => setCurrentPage(page)}
              />
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Component API">
          <Library.Example title="currentPage">
            <Library.Info>
              <Library.InfoItem label="description">
                The 1-based number of the currently visible page.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>number</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>

          <Library.Example title="onChangePage">
            <Library.Info>
              <Library.InfoItem label="description">
                Callback invoked with the new page number when the user clicks a
                navigation button.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>(newPage: number) {'=>'} void</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>

          <Library.Example title="totalPages">
            <Library.Info>
              <Library.InfoItem label="description">
                The total number of pages available.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>number</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
