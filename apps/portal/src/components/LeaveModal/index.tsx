// @ts-nocheck
import React, { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import * as H from 'history';
import { Button, Modal, Typography } from '@lumos/core';
import NavigationPrompt from 'react-router-navigation-prompt';

export interface LeaveModalProps {
  title: string;
  content: string;
  /**
   * Function called when user decide to cancel the navigation.
   */
  onCancel?: () => void;
  /**
   * Function called when user continue to the navigation.
   */
  onConfirm?: () => void;
}

/**
 * Leave Modal for that comes with navigation prompt.
 * @remarks Use this component when there is navigation prompt
 * needs to happen when the route changes. For any routes that
 * are governed by react-router, a Lumos themed modal will be
 * used. For any routes that is outside of react-router, such
 * as closing the tab, or an external page, the browser native
 * navigation strategies will be applied and when this happens,
 * it will ignore the title and content props supplied.
 * @remarks When need to prevent the LeaveModal from prompting,
 * add a state in the location with `force: true`:
 * e.g.,
 * history.push({
 *   pathname: '/next/path',
 *   state: {
 *     force: true,
 *   },
 * });
 */

const LeaveModal: React.FC<LeaveModalProps> = ({
  title,
  content,
  onCancel,
  onConfirm,
}) => {
  const { t } = useTranslation();

  /**
   * Layout Effects
   */
  useLayoutEffect(() => {
    Modal.setAppElement('body');
  });

  const shouldBlock = (current: H.Location, next?: H.Location) => {
    // if there is force = true in the state, don't block.
    if (next && next.state && next.state['force'] === true) {
      return false;
    }

    // close session or different path
    return !next || !next.pathname.startsWith(current.pathname);
  };

  return (
    <NavigationPrompt when={shouldBlock}>
      {({ isActive, onCancel: navCancel, onConfirm: navConfirm }) => {
        const onRequestClose = () => {
          navCancel();
          if (onCancel) {
            onCancel();
          }
        };

        const onLeave = () => {
          navConfirm();
          if (onConfirm) {
            onConfirm();
          }
        };

        return (
          <Modal
            kind="warning"
            heading={title}
            closeButtonAriaLabel={t('common:close')}
            isOpen={isActive}
            onRequestClose={onRequestClose}
          >
            <Modal.Body>
              <Typography kind="body1">{content}</Typography>
            </Modal.Body>
            <Modal.Footer>
              <Button kind="text" onClick={onRequestClose} marginX={2}>
                {t('common:stayOnPage')}
              </Button>
              <Button
                id="leave-process-btn"
                kind="primary"
                onClick={onLeave}
                marginX={2}
              >
                {t('common:leaveProcess')}
              </Button>
            </Modal.Footer>
          </Modal>
        );
      }}
    </NavigationPrompt>
  );
};

export default LeaveModal;
