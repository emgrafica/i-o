import { useTranslation } from 'react-i18next';
import React from 'react';
import { Tabs as LumosTabs, Box } from '@lumos/core';
import { ApproverState } from 'gqlTypes/globalTypes';

/**
 * Props type for the Tabs component.
 */
interface TabsProps {
  /** The status of the approvals displayed in the page */
  approverState: ApproverState;

  /** Callback to react to changes to the approverState */
  onApproverStateChange: (approverState: ApproverState) => void;
}

/**
 * Renders the tabs of the Approvals page.
 * Changes the approverState when the user changes the tab
 *
 * @param props The props the component expect
 */
export const Tabs: React.FC<TabsProps> = props => {
  const { t } = useTranslation();
  return (
    <Box marginBottom="32px">
      <LumosTabs
        defaultActiveTab={props.approverState}
        fullWidth
        onChange={tabLabel =>
          props.onApproverStateChange(tabLabel as ApproverState)
        }
      >
        <LumosTabs.Tab label={ApproverState.Pending}>
          {t('approvals:pending')}
        </LumosTabs.Tab>
        <LumosTabs.Tab label={ApproverState.Approved}>
          {t('approvals:approved')}
        </LumosTabs.Tab>
        <LumosTabs.Tab label={ApproverState.Declined}>
          {t('approvals:declined')}
        </LumosTabs.Tab>
      </LumosTabs>
    </Box>
  );
};
