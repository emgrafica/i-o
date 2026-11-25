import React from 'react';
import { Tabs as LumosTabs } from '@lumos/core';
import { useTranslation } from 'react-i18next';

export enum TabLabel {
  KnowledgeArticles = 'knowledge',
  BusinessApplications = 'application',
}

/**
 * Props type for the Tabs component.
 */
interface TabsProps {
  /** The tab selected*/
  activeTab: TabLabel;

  /** Callback to handle clicks on tabs */
  onClick: (selectedTab: TabLabel) => void;

  knowledgeArticleCount?: number;
  businessApplicationCount?: number;
}

/**
 * Renders the tabs of the Get Support page.
 *
 * @param props The props the component expect
 */
export const Tabs: React.FC<TabsProps> = ({
  onClick,
  activeTab,
  knowledgeArticleCount,
  businessApplicationCount,
}) => {
  const { t } = useTranslation();
  const renderKnowledgeArticlesCount = knowledgeArticleCount !== undefined;
  const renderBusinessApplicationCount = knowledgeArticleCount !== undefined;
  return (
    <LumosTabs
      activeTab={activeTab}
      fullWidth
      onClick={tabLabel => onClick(tabLabel as TabLabel)}
    >
      <LumosTabs.Tab label={TabLabel.KnowledgeArticles}>
        {t('getSupportSearch:knowledgeArticlesTabTitle')}
        {renderKnowledgeArticlesCount && `(${knowledgeArticleCount})`}
      </LumosTabs.Tab>
      <LumosTabs.Tab label={TabLabel.BusinessApplications}>
        {t('getSupportSearch:businessApplicationsTabTitle')}
        {renderBusinessApplicationCount && `(${businessApplicationCount})`}
      </LumosTabs.Tab>
    </LumosTabs>
  );
};

export default Tabs;
