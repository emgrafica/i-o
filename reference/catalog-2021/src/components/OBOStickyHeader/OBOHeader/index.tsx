import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Popover, Typography } from '@lumos/core';
import { PeopleAlt } from '@material-ui/icons';
import {
  StyledCenteredFlexBox,
  StyledCenteredBox,
  StyledDataBox,
  StyledInfo,
  StyledMobileCenteredBox,
  StyledMobileDataBox,
  StyledMobileTypography,
  StyledTypography,
} from './index.style';
import { OboInfo_oboInfo_user } from 'store/apollo/store/actions/queries/gqlTypes/OboInfo';
import ShowFor from 'components/ShowFor';
import CancelOBOModal from './CancelOBOModal';

/**
 * OBO Header Props
 */
interface OBOHeaderProps {
  oboUser: OboInfo_oboInfo_user;
}
/**
 * OBO Header Component
 *
 */
const OBOHeader: React.FC<OBOHeaderProps> = props => {
  const { oboUser } = props;
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <ShowFor mobile>
        <StyledCenteredFlexBox flexDirection="column">
          <StyledMobileCenteredBox flexDirection="column">
            <StyledMobileTypography kind="h6">
              {t('oboStickyHeader:title')}
            </StyledMobileTypography>
            <StyledMobileDataBox>
              <Popover
                id="overlayLearnMore"
                placement="bottom"
                content={
                  <Box margin="16px">
                    <Typography kind="body3" margin={0}>
                      {t('oboStickyHeader:subtitle')}
                    </Typography>
                  </Box>
                }
              >
                <StyledInfo fontSize="inherit" />
              </Popover>
              <StyledMobileTypography kind="body1" margin={0}>
                {`${oboUser.firstName} ${oboUser.lastName} (${oboUser.userId})`}
              </StyledMobileTypography>
            </StyledMobileDataBox>
          </StyledMobileCenteredBox>
          <Button kind="primary" onClick={openModal} marginTop={1}>
            {t('common:cancel')}
          </Button>
          <CancelOBOModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </StyledCenteredFlexBox>
      </ShowFor>
      <ShowFor tabletAndLarger>
        <StyledCenteredFlexBox>
          <StyledCenteredBox>
            <StyledDataBox>
              <PeopleAlt />
              <StyledTypography kind="h6">
                {t('oboStickyHeader:title')}
              </StyledTypography>
              <StyledTypography kind="body1">
                {`${oboUser.firstName} ${oboUser.lastName} (${oboUser.userId})`}
              </StyledTypography>
            </StyledDataBox>
            <Typography kind="subtitle2">
              {t('oboStickyHeader:subtitle')}
            </Typography>
          </StyledCenteredBox>
          <Button kind="primary" onClick={openModal}>
            {t('common:cancel')}
          </Button>
          <CancelOBOModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </StyledCenteredFlexBox>
      </ShowFor>
    </>
  );
};

export default OBOHeader;
