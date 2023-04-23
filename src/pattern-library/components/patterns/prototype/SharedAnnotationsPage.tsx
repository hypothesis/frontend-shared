import type { ComponentChildren } from 'preact';
import { useState } from 'preact/hooks';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  EditIcon,
  EllipsisIcon,
  GlobeIcon,
  GroupsFilledIcon,
  IconButton,
  ModalDialog,
  PinIcon,
  ReplyIcon,
  TrashIcon,
  Tab,
  TabList,
} from '../../../../';
import type { ModalDialogProps } from '../../../../components/feedback/ModalDialog';
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

/**
 * Wrap the ModalDialog component with some state management to make reuse in
 * multiple examples plausible and convenient.
 */
function ModalDialog_({ buttons, children, ...dialogProps }: ModalDialogProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const closeDialog = () => setDialogOpen(false);

  const openButton = (
    <Button onClick={() => setDialogOpen(!dialogOpen)} variant="primary">
      {dialogOpen ? 'Hide' : 'Show'} dialog
    </Button>
  );

  return (
    <>
      {!dialogOpen && openButton}
      {dialogOpen && (
        <ModalDialog buttons={buttons} {...dialogProps} onClose={closeDialog}>
          {children}
        </ModalDialog>
      )}
    </>
  );
}

export default function SharedAnnotationsPrototypePage() {
  return (
    <Library.Page
      title="Re-using annotations in copied course assignments"
      intro={
        <>
          {' '}
          <p>
            Give instructors the ability to create and manage{' '}
            <b className="font-semibold">course-shared content</b> that all
            course participants can see regardless of section group membership.
            Separately, provide instructors the ability to{' '}
            <b className="font-semibold">pin content</b> such that it shows up
            at the top of sidebar on every tab.
          </p>
          <p>
            On first launch, or when editing settings for an assignment in a
            copied course, give the instructor the option to{' '}
            <b className="font-semibold">
              copy all of the course-shared annotations they created in the
              source assignment
            </b>{' '}
            to the copied assignment.
          </p>
        </>
      }
    >
      <Library.Section>
        <Library.Callout>
          <strong>Note:</strong> The UI sketches here are intended as
          low-fidelity wireframes to demonstrate UX and flow intent. They are
          not intended to represent polished design.
        </Library.Callout>
        <Library.Section title="User stories">
          <p>
            The low-fidelity UI sketches in this document attempt to address the{' '}
            <a href="https://docs.google.com/document/d/1jrWGqRaCab-jhqrHjSEQXjOzMo8JGBPJz3BdYec_Zk0">
              user stories in this document
            </a>{' '}
            (access limited to Hypothesis team).
          </p>
        </Library.Section>
        <p>As broken down here, there are three implied projects:</p>
        <ol start={1}>
          <li>Course-shared content</li>
          <li>Pinned content</li>
          <li>Annotation re-use for copied course assignments</li>
        </ol>
        <p>
          <i>Pinned content</i> is independent functionality and could be
          deferred if desired. <i>Annotation re-use</i> depends on{' '}
          <i>course-shared content</i>.
        </p>
      </Library.Section>
      <Library.Section
        title="1. Course-shared content"
        intro={
          <p>
            An instructor may create top-level annotations that are visible to
            everyone in the course, regardless of which section group they
            belong to. An instructor may edit an annotation and move it into or
            out of this “all-participants” group.
          </p>
        }
      >
        <Library.Section title="Creating and managing course-shared content">
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

          <Library.Section title="User interface: When an annotation has replies">
            <p>
              It may be difficult technically and logically to deal with moving
              annotations between course-shared and section-group-only once they
              have replies. If that is the case, we could restrict moving an
              annotation once it has replies.
            </p>

            <Library.Demo title="One option">
              <div className="text-[13px] leading-none h-[200px]">
                <FakeAnnotationPublishControl group="Section 1" noSharing />
              </div>
            </Library.Demo>

            <Library.Demo title="Another option">
              <div className="text-[13px] leading-none h-[200px]">
                <FakeAnnotationPublishControl
                  group="Section 1"
                  noSharing
                  noSharingMessage={'Annotations with replies cannot be moved'}
                />
              </div>
            </Library.Demo>
          </Library.Section>

          <Library.Section title="User interface: Improving experience in the future">
            <p>
              It might be possible to consolidate some annotation actions into a{' '}
              {'"manage-annotation menu"'} at the top right of a top-level
              annotation card. And we could to distinguish between moving and
              copying.
            </p>
            <p>
              This gives the user an option to copy a top-level annotation that
              they authored. Annotations with replies could be copied but not
              moved (replies would not get copied).
            </p>
            <Library.Demo title="Annotation card with context menu">
              <FakeSidebar>
                <FakeAnnotation isOwn withManageMenu />
              </FakeSidebar>
            </Library.Demo>

            <Library.Demo title="Annotation (with replies) and context menu">
              <FakeSidebar>
                <FakeAnnotation hasReplies isOwn withManageMenu />
              </FakeSidebar>
            </Library.Demo>
          </Library.Section>
        </Library.Section>

        <Library.Section title="Displaying course-shared content">
          <p>
            Content visible to all course participants should be “merged into”
            the annotation threads for the active group (section/reading group
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
        title="2. Pinned Content"
        intro={
          <p>
            A top-level annotation can be “pinned” by authorized users, which
            makes the annotation(s) show up at the top of the sidebar above the
            annotation-type tabs at all times. This feature could help with the
            use case of instructors wanting to put certain annotations front and
            center, or provide instructions or prompts for the assignment as a
            whole.{' '}
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

      <Library.Section
        title="3. Re-using content in copied course assignments"
        intro={
          <p>
            An instructor copies a course. Afterwards, they have the option to{' '}
            <b>
              copy over their own annotation content that was shared to all
              participants
            </b>{' '}
            on an assignment-by-assignment basis. They could then edit or remove
            any that they want to change or delete.
          </p>
        }
      >
        <Library.Section title="Copying annotations on first launch">
          <Library.Section title="User interface: Modal on first launch">
            <Library.Demo>
              <ModalDialog_
                title="Re-use content for this assignment?"
                buttons={<Button variant="primary">Continue</Button>}
              >
                <p>
                  It looks like this assignment was copied from another course.
                  You can re-use your shared content in this assignment.
                </p>
                <div className="border-b" />
                <Checkbox>Copy shared annotations to this assignment</Checkbox>
                <div className="border-b" />
                <p className="text-xs">
                  <em>
                    Only your annotations shared with all course participants
                    will be copied. Replies are not copied. You can edit or
                    remove individual copied annotations at any time.
                  </em>
                </p>
              </ModalDialog_>
            </Library.Demo>
          </Library.Section>
        </Library.Section>
      </Library.Section>
    </Library.Page>
  );
}
