import { Box, Button, Grid, Typography } from '@lumos/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactModal from 'react-modal';
import welcomeModalImage from 'assets/images/welcomeModal/accessoryComputerModal.png';
import { useMutation } from '@apollo/react-hooks';
import { USER_LOGIN_TIMESTAMP } from 'graphql/mutations/userLoginTimestamp';
import {
  UserLoginTimestamp,
  UserLoginTimestampVariables,
} from 'graphql/mutations/gqlTypes/UserLoginTimestamp';
import { useUserId } from 'containers/AuthContainer/AuthContext';
import ShowFor from 'components/ShowFor';
import { env, variables } from '../../utils/env';
import { CloseBox } from './CloseBox';
import { ArrowRightAlt, Close } from '@material-ui/icons';

/** Render a welcome modal to let the user know about new changes in the platform */
const WelcomeModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation('welcomeModal');
  const userId = useUserId();

  const [userLoginTimestampMutation] = useMutation<
    UserLoginTimestamp,
    UserLoginTimestampVariables
  >(USER_LOGIN_TIMESTAMP, {
    onCompleted: data => {
      // TODO: Change timestamp value to be queried from Graphiti instead of being an ENV variable.
      // Going with this solution due to current time constraints.
      if (
        data.userLoginTimestamp.lastLoginTime <=
        parseInt(env(variables.showWelcomeModalTimestamp))
      )
        setIsOpen(true);
    },
  });
  useEffect(() => {
    if (userId) userLoginTimestampMutation({ variables: { userId } });
  }, [userId, userLoginTimestampMutation]);

  const displayBulletPoints = () => {
    const bulletPoints = [];
    for (let value = 1; value <= 4; value++) {
      bulletPoints.push(
        <Grid key={value} marginBottom={2}>
          <li />
          <Typography kind="body2" color="primary.1" margin={0}>
            {t(`bullet${value}`)}
          </Typography>
        </Grid>,
      );
    }
    return bulletPoints;
  };

  return (
    <ShowFor desktopAndLarger>
      <ReactModal
        className="welcome-modal"
        overlayClassName="welcome-modal-overlay"
        isOpen={isOpen}
      >
        <Grid>
          {/*left side box*/}
          <Box width="420px" marginTop="130px" marginLeft="50px">
            <Grid>
              <Box
                marginTop="25px"
                marginRight="8px"
                height="3px"
                width="32px"
                backgroundColor="primary.1"
              />
              <Box width="380px">
                <Typography
                  kind="h5"
                  fontWeight="300"
                  fontSize="36px"
                  color="primary.1"
                >
                  {t('title')}
                </Typography>
              </Box>
            </Grid>
            <Box width="380px">
              <Typography kind="body2" marginTop="39px" color="primary.1">
                {t('firstParagraph')}
              </Typography>
              {displayBulletPoints()}
            </Box>
          </Box>

          {/*right side box*/}
          <Box
            backgroundColor="#F8f8f9"
            minWidth="421px"
            height="622px"
            marginLeft="auto"
            borderTopRightRadius="10px"
          >
            <Grid>
              <CloseBox
                marginLeft="auto"
                as="button"
                backgroundColor="transparent"
                alignItems="center"
                justifyContent="center"
                color="enabled"
                padding="0"
                margin="15px 15px 15px auto"
                onClick={() => setIsOpen(false)}
              >
                <Close />
              </CloseBox>
            </Grid>
            <img
              src={welcomeModalImage}
              alt="welcome"
              width="573px"
              style={{ marginLeft: '-152px', marginTop: '20px' }}
            />
          </Box>
        </Grid>

        {/*close button*/}
        <Grid>
          <Box marginLeft="auto" marginY="14px" marginRight="14px">
            <Button
              kind="text"
              onClick={() => setIsOpen(false)}
              withIconOnRight={<ArrowRightAlt />}
            >
              {t('closeButton')}
            </Button>
          </Box>
        </Grid>
      </ReactModal>
    </ShowFor>
  );
};

export default WelcomeModal;
