import React from 'react';
import { TenantConfigQuickLink } from 'models';
import { StyledWhiteBox } from '../../../general.style';
import QuickLinksContent from './QuickLinksContent';

export interface QuickLinksSectionProps {
  quickLinks: TenantConfigQuickLink[] | null;
  quickLinksLoading?: boolean;
  quickLinksError?: boolean;
  refetchQuickLinks?: () => void;
}

const QuickLinksSection: React.FC<QuickLinksSectionProps> = ({
  quickLinks,
  quickLinksLoading,
  quickLinksError,
  refetchQuickLinks,
}) => {
  return (
    <StyledWhiteBox height="auto">
      <QuickLinksContent
        quickLinks={quickLinks}
        quickLinksLoading={quickLinksLoading}
        quickLinksError={quickLinksError}
        refetchQuickLinks={refetchQuickLinks}
      />
    </StyledWhiteBox>
  );
};

export default QuickLinksSection;
