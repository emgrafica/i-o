import React from 'react';
import { StyledWhiteBox } from '../../../general.style';
import GetAssistanceContent from './GetAssistanceContent';

export interface GetAssistanceSectionProps {
  helpdeskName: string | null;
  tenantLoading: boolean;
}

const GetAssistanceSection: React.FC<GetAssistanceSectionProps> = ({
  helpdeskName,
  tenantLoading,
}) => {
  return (
    <StyledWhiteBox height={200}>
      <GetAssistanceContent
        helpdeskName={helpdeskName}
        tenantLoading={tenantLoading}
      />
    </StyledWhiteBox>
  );
};

export default GetAssistanceSection;
