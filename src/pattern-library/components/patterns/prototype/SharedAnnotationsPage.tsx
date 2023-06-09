import type { ComponentChildren } from 'preact';

import {
  Card,
  CardActions,
  CardContent,
  EditIcon,
  EllipsisIcon,
  GlobeIcon,
  GroupsFilledIcon,
  IconButton,
  PinIcon,
  ReplyIcon,
  TrashIcon,
  Tab,
  TabList,
} from '../../../../';
import Library from '../../Library';
import { LoremIpsum } from '../samples';
import FakeAnnotationPublishControl from './FakeAnnotationPublishControl';
import FakeMenu from './Menu';
import FakeMenuItem from './MenuItem';
import FakeMenuSection from './MenuSection';

type FakeAnnotationProps = {
  children?: ComponentChildren;
  hasReplies?: boolean;
  isOwn?: boolean;
  isPinned?: boolean;
  isShared?: boolean;
  withManageMenu?: boolean;
};

function FakeAnnotation({
  children,
  hasReplies = false,
  isOwn = false,
  isPinned = false,
  isShared = false,
  withManageMenu = false,
}: FakeAnnotationProps) {
  const actions = ['reply'];
  if (isOwn) {
    actions.push('pin', 'edit');
    if (!withManageMenu) {
      actions.push('delete');
    }
  }
  const content = children ?? <LoremIpsum size="xs" />;
  const groupName = isShared ? 'All course participants' : 'Section 1';
  return (
    <Card classes="relative">
      <div className="absolute right-full space-y-1 pt-1">
        {isPinned && (
          <div className="bg-brand p-1.5 rounded-l">
            <PinIcon className="text-white" />
          </div>
        )}
        {isShared && (
          <div className="bg-sky-600 p-1.5 rounded-l">
            <GroupsFilledIcon className="text-white" />
          </div>
        )}
      </div>
      <CardContent size="sm" classes="text-sm">
        <div>
          <div className="flex gap-x-2">
            <div className="font-semibold text-sm grow">Fred Pickle</div>
            <div className="w-[16px] h-[16px]">
              {withManageMenu && (
                <FakeMenu
                  align="right"
                  contentClass="min-w-[200px]"
                  defaultOpen
                  menuIndicator={false}
                  title="Manage annotation"
                  label={<EllipsisIcon className="text-color-text-light" />}
                >
                  <FakeMenuSection>
                    <FakeMenuItem label="Edit" />
                    <FakeMenuItem label="Copy to..." />
                    {!hasReplies && <FakeMenuItem label="Move to..." />}
                    {hasReplies && (
                      <FakeMenuItem
                        isDisabled
                        label={
                          <div className="flex flex-col gap-y-1 py-1">
                            <div>Move to...</div>
                            <div className="text-xs italic">
                              Annotations with replies cannot be moved
                            </div>
                          </div>
                        }
                      />
                    )}
                  </FakeMenuSection>
                  <FakeMenuSection>
                    <FakeMenuItem
                      icon={TrashIcon}
                      label={<span className="text-brand">Delete</span>}
                    />
                  </FakeMenuSection>
                </FakeMenu>
              )}
            </div>
          </div>
          <div className="flex gap-x-2">
            <div className="flex gap-x-1 items-center text-xs grow text-color-text-light">
              <GlobeIcon className="w-2.5 h-2.5" />
              <div>{groupName}</div>
            </div>
            <div className="flex gap-x-2 items-center">
              <div className="text-color-text-light text-xs italic">
                (edited Apr 23)
              </div>
              <div className="text-color-text-light text-sm">Apr 22</div>
            </div>
          </div>
        </div>
        {content}
        <CardActions>
          <div className="flex text-[16px]">
            {actions.includes('edit') && (
              <IconButton icon={EditIcon} title="Edit" />
            )}
            {actions.includes('delete') && (
              <IconButton icon={TrashIcon} title="Delete" />
            )}
            {actions.includes('pin') && (
              <IconButton
                icon={PinIcon}
                title={isPinned ? 'Unpin' : 'Pin'}
                pressed={isPinned}
              />
            )}
            {actions.includes('reply') && (
              <IconButton icon={ReplyIcon} title="Reply" />
            )}
          </div>
        </CardActions>
      </CardContent>
    </Card>
  );
}

function FakeSidebar({ children }: { children: ComponentChildren }) {
  return (
    <div className="bg-grey-1 py-4 px-10 space-y-4 w-[465px] text-color-text">
      {children}
    </div>
  );
}

export default function SharedAnnotationsPrototypePage() {
  return (
    <Library.Page
      title="Sharing annotations with all assignment participants"
      intro={
        <p>
          Give instructors the ability to create and manage{' '}
          <b className="font-semibold">course-shared content</b> that all
          assignment participants can see regardless of section group
          membership. Separately, provide instructors the ability to{' '}
          <b className="font-semibold">pin content</b> such that it shows up at
          the top of sidebar on every tab.
        </p>
      }
    >
      <Library.Section>
        <Library.Callout>
          <strong>Note:</strong> The UI sketches here are intended as
          low-fidelity wireframes to demonstrate UX and flow intent. They are
          not intended to represent polished design.
        </Library.Callout>
        <Library.Section title="Creating and managing content shared to all participants">
          <p>
            An instructor may create top-level annotations that are visible to
            everyone in the assignment, regardless of which segment they belong
            to. An instructor may edit an annotation and change its sharing
            target.
          </p>
          <Library.Section title="User interface: Creating or editing an annotation">
            <p>
              We might be able to extend the existing annotation-publish
              control. The annotation-publish control is available when creating{' '}
              <i>or</i> editing an annotation.
            </p>

            <Library.Demo title="Extending the AnnotationPublishControl interface">
              <div className="text-[13px] leading-none h-[200px]">
                <FakeAnnotationPublishControl group="Section 1" />
              </div>
            </Library.Demo>
          </Library.Section>

          <Library.Section title="User interface: Improving experience in the future">
            <p>
              In the future, we might provide both share/move and copy options
              for a root-level annotation.
            </p>
            <p>
              One option: it might be possible to consolidate some annotation
              actions into a {'"manage-annotation menu"'} at the top right of a
              top-level annotation card.
            </p>
            <Library.Demo title="Annotation card with context menu">
              <FakeSidebar>
                <FakeAnnotation isOwn withManageMenu />
              </FakeSidebar>
            </Library.Demo>
          </Library.Section>
        </Library.Section>

        <Library.Section title="Displaying shared content">
          <p>
            Content visible to all assignment participants should be{' '}
            {'"merged into"'}
            the annotation threads for the active segment (section/reading group
            as indicated by the group selector in the top bar), but it should be
            easy to distinguish which annotation threads are shared to all
            participants.
          </p>
          <Library.Section title="User interface: showing shared and non-shared annotations together">
            <p>
              It should be easy to visually distinguish which annotations in the
              sidebar are shared.
            </p>
            <Library.Demo>
              <FakeSidebar>
                <TabList classes="gap-x-4">
                  <Tab selected>Annotations</Tab>
                  <Tab>Page Notes</Tab>
                  <Tab>Orphans</Tab>
                </TabList>

                <FakeAnnotation />
                <FakeAnnotation isOwn isShared />
                <FakeAnnotation />
                <FakeAnnotation isOwn isShared />
                <FakeAnnotation isOwn />
              </FakeSidebar>
            </Library.Demo>
          </Library.Section>
        </Library.Section>
      </Library.Section>

      <Library.Section
        title="Possible future feature: pinning content"
        intro={
          <p>
            A top-level annotation can be {'"pinned"'} by authorized users,
            which makes the annotation(s) show up at the top of the sidebar
            above the annotation-type tabs at all times. This feature could help
            with the use case of instructors wanting to put certain annotations
            front and center, or provide instructions or prompts for the
            assignment as a whole.{' '}
          </p>
        }
      >
        <Library.Section title="Pinning and unpinning content">
          <p>
            Pinning is a “toggle” type of functionality. We could restrict its
            availability to top-level annotations.
          </p>
          <Library.Section title="User interface: Toggling pinning">
            <p>
              As pinning is a toggling function, we could add an additional icon
              to the annotation footer.
            </p>
            <Library.Demo>
              <FakeSidebar>
                <FakeAnnotation isOwn />
              </FakeSidebar>
            </Library.Demo>
          </Library.Section>
        </Library.Section>

        <Library.Section title="Displaying pinned content">
          <p>
            Pinned content could be shown <i>above</i> all other content,
            including tabs (i.e. a pinned Page Note would also show up on the
            Annotations tab, but above the tabs). This could satisfy use cases
            relating to creating prompts or instructions for assignments, or for
            otherwise showing certain instructor content at the top.
          </p>
          <Library.Section title="User interface: Showing pinned, shared and non-shared annotations">
            <p>An annotation may be both shared and pinned.</p>
            <Library.Demo>
              <FakeSidebar>
                <FakeAnnotation isOwn isPinned />
                <FakeAnnotation isOwn isPinned isShared />

                <TabList classes="gap-x-4">
                  <Tab selected>Annotations</Tab>
                  <Tab>Page Notes</Tab>
                  <Tab>Orphans</Tab>
                </TabList>
                <FakeAnnotation />
                <FakeAnnotation isOwn isShared />
                <FakeAnnotation />
                <FakeAnnotation isOwn isShared />
              </FakeSidebar>
            </Library.Demo>
          </Library.Section>
        </Library.Section>
      </Library.Section>
    </Library.Page>
  );
}
