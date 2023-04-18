import classnames from 'classnames';

import {
  Button,
  CancelIcon,
  GlobeIcon,
  GroupsIcon,
  InfoIcon,
  LockIcon,
  MenuExpandIcon,
} from '../../../..';
import Menu from './Menu';
import MenuItem from './MenuItem';

export type AnnotationPublishControlProps = {
  /** The group this annotation or draft would publish to */
  group: string;

  /**
   * Should the save button be disabled? Hint: it will be if the annotation has
   * no content
   */
  isDisabled?: boolean;

  /** Annotation or draft is "Only Me" */
  isPrivate?: boolean;

  noSharing?: boolean;

  noSharingMessage?: string;

  /** Callback for cancel button click */
  onCancel?: () => void;

  /** Callback for save button click */
  onSave?: () => void;
};

/**
 * Render a compound control button for publishing (saving) an annotation:
 * - Save the annotation — left side of button
 * - Choose sharing/privacy option - drop-down menu on right side of button
 *
 * @param {AnnotationPublishControlProps} props
 */
function AnnotationPublishControl({
  group,
  isDisabled = false,
  isPrivate = false,
  noSharing = false,
  noSharingMessage = "Why can't I share this annotation?",
  onCancel = () => {},
  onSave = () => {},
}: AnnotationPublishControlProps) {
  const menuLabel = (
    <div className="w-9 h-9 flex items-center justify-center text-color-text-inverted">
      <MenuExpandIcon className="w-4 h-4" />
    </div>
  );

  return (
    <div className="flex flex-row gap-x-3">
      <div className="flex relative">
        <Button
          classes={classnames(
            // Turn off right-side border radius to align with menu-open button
            'rounded-r-none'
          )}
          data-testid="publish-control-button"
          onClick={onSave}
          disabled={isDisabled}
          size="lg"
          variant="primary"
        >
          Post to {isPrivate ? 'Only Me' : group}
        </Button>
        {/* This wrapper div is necessary because of peculiarities with
             Safari: see https://github.com/hypothesis/client/issues/2302 */}
        <div
          className={classnames(
            // Round the right side of this menu-open button only
            'flex flex-row rounded-r-sm bg-grey-7 hover:bg-grey-8'
          )}
        >
          <Menu
            arrowClass={classnames(
              // Position up-pointing menu caret aligned beneath the
              // down-pointing menu-open button icon
              'right-[10px]'
            )}
            containerPositioned={false}
            contentClass={classnames(
              // Ensure the menu is wide enough to "reach" the right-aligned
              // up-pointing menu arrow
              'min-w-full'
            )}
            defaultOpen
            label={menuLabel}
            menuIndicator={false}
            title="Change annotation sharing setting"
            align="left"
          >
            <MenuItem
              icon={GroupsIcon}
              label={`${group} only`}
              isSelected={!isPrivate}
            />
            <MenuItem
              icon={GlobeIcon}
              label="All course participants"
              isDisabled={noSharing}
            />
            {noSharing && (
              <div className="bg-grey-0 text-color-text-light">
                <div className="flex gap-x-1 items-center pb-1 pl-[11px]">
                  <div>
                    <InfoIcon className="w-[12px] h-[12px]" />
                  </div>
                  <div className="text-xs px-2 italic text-color-text-light min-w-min whitespace-nowrap">
                    {noSharingMessage}
                  </div>
                </div>
              </div>
            )}
            <MenuItem icon={LockIcon} label="Only Me" isSelected={isPrivate} />
          </Menu>
        </div>
      </div>
      <div>
        <Button data-testid="cancel-button" onClick={onCancel} size="lg">
          <CancelIcon />
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default AnnotationPublishControl;
