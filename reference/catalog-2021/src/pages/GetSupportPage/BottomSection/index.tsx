import React from 'react';
import { Typography, Box, Container, Grid } from '@lumos/core';
import useBreakpoint, { Breakpoint } from 'utils/useBreakpoint';
import { useTranslation } from 'react-i18next';
import bottomPattern from 'assets/images/getSupport/bottomPattern.png';
import chatNowIcon from 'assets/images/getSupport/chatNowIcon.svg';
import MDPModal from './MDPModal';
import ContactCard from './ContactCard';
import ServiceDeskModal from './ServiceDeskModal';
import { openChat } from 'utils/chat';
import { env, variables } from 'utils/env';

const BottomSection: React.FC = () => {
  const breakpoint = useBreakpoint();
  const { t } = useTranslation('getSupport');
  const [isServiceDeskModalOpen, setIsServiceDeskModalOpen] = React.useState(
    false,
  );
  const [isMPDModalOpen, setIsMPDModalOpen] = React.useState(false);

  return (
    <Box
      background={`url(${bottomPattern})`}
      backgroundPosition="center"
      backgroundSize="cover"
    >
      <Container
        paddingY="44px"
        paddingX="24px"
        flexDirection="column"
        alignItems="center"
      >
        <Grid flexDirection="column" maxWidth={{ xxs: '556px', lg: '1136px' }}>
          <Typography kind={breakpoint <= Breakpoint.sm ? 'h5' : 'h4'}>
            {t('bottomSection.header')}
          </Typography>

          <Grid
            flexDirection="row"
            width="100%"
            flexWrap="wrap"
            marginTop="32px"
            marginBottom="82px"
            marginX="-8px"
          >
            <ContactCard
              title={t('bottomSection.serviceDesk.title')}
              body={t('bottomSection.serviceDesk.body')}
              primaryActionLabel={t('common:chatNow')}
              primaryActionLabelIcon={<img src={chatNowIcon} alt="chat icon" />}
              secondaryActionLabel={t(
                'bottomSection.serviceDesk.secondaryAction',
              )}
              onPrimaryButtonClick={openChat}
              onSecondaryButtonClick={() => setIsServiceDeskModalOpen(true)}
              primaryActionId="chatNow"
              secondaryActionId="learnMore"
            />
            <ContactCard
              title={t('bottomSection.lounge.title')}
              body={t('bottomSection.lounge.body')}
              primaryActionLabel={t('bottomSection.lounge.action')}
              onPrimaryButtonClick={() => {
                window.open(env(variables.loungeUrl));
              }}
              primaryActionId="findLounge"
            />
            <ContactCard
              title={t('bottomSection.mdp.title')}
              body={t('bottomSection.mdp.body')}
              primaryActionLabel={t('bottomSection.mdp.action')}
              onPrimaryButtonClick={() => setIsMPDModalOpen(true)}
              primaryActionId="contactInfo"
            />
          </Grid>
        </Grid>
      </Container>
      <ServiceDeskModal
        isModalOpen={isServiceDeskModalOpen}
        setIsModalOpen={setIsServiceDeskModalOpen}
      />
      <MDPModal
        isModalOpen={isMPDModalOpen}
        setIsModalOpen={setIsMPDModalOpen}
      />
    </Box>
  );
};

export default BottomSection;
