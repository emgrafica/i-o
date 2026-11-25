import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Card,
  Container,
  Form,
  Grid,
  TopNav,
  Typography,
} from '@lumos/core';
import { Mail, NavigateNext } from '@material-ui/icons';
// import ioLogo from 'assets/images/branding/io_logo.png';
import LoginImage from 'assets/images/login/login_image.jpg';
import { TOP_NAV_HEIGHT } from 'constants/index';
import PageTitle from 'components/PageTitle';

/**
 * Login props
 * login: loginFunction from AzureAD
 */
interface LoginProps {
  login: () => void;
}
/**
 * Login
 */
const Login: React.FC<LoginProps> = props => {
  const { t } = useTranslation();
  const [email, setEmail] = React.useState('');
  const [invalidEmailFormat, setInvalidEmailFormat] = React.useState(false);
  const regEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  const validateEmailFormat = (emailAddress: string) => {
    return regEx.test(emailAddress);
  };

  return (
    <>
      <PageTitle title={t('login:login')} />
      <TopNav label="global">
        <TopNav.Menu>
          <Box marginLeft={{ xxs: '-26px', md: 0 }}>
            <TopNav.Logo>
              <a href=".">
                {/* <img src={ioLogo} alt="io" height="38px" /> */}
              </a>
            </TopNav.Logo>
          </Box>
        </TopNav.Menu>
      </TopNav>
      <Container
        flexDirection="column"
        height={`calc(100vh - ${TOP_NAV_HEIGHT}px)`}
      >
        <Grid
          backgroundImage={`linear-gradient(rgba(255,255,255,.4), rgba(255,255,255,.4)), url(${LoginImage})`}
          backgroundPosition="30% 0%"
          justifyContent="center"
          height="100%"
        >
          <Card
            position="relative"
            top="25%"
            width="440px"
            height="271px"
            title={t('login:title')}
            topRule
            paddingLeft={5}
          >
            <Typography kind="body2" marginTop={0} color="state.active">
              {t('login:subtitle')}
            </Typography>
            <Form.Item
              htmlFor="email"
              label={t('login:email')}
              paddingLeft={0}
              marginTop={3}
              marginBottom={6}
            >
              <Form.Input
                id="email"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const newEmail = event.currentTarget.value;
                  setEmail(newEmail);
                  setInvalidEmailFormat(!validateEmailFormat(newEmail));
                }}
                value={email}
                placeholder={t('login:emailPlaceholder')}
                icon={<Mail />}
                type="email"
                hasError={invalidEmailFormat}
              />
              {/* Invalid Email Error */}
              <Typography kind="feedback" paddingTop={1}>
                {invalidEmailFormat ? t('login:invalidEmail') : ''}
              </Typography>
            </Form.Item>
            <Grid justifyContent="flex-end">
              <Button
                kind="primary"
                disabled={email.length <= 0 || invalidEmailFormat}
                withIconOnRight={<NavigateNext />}
                onClick={props.login}
              >
                {t('common:continue')}
              </Button>
            </Grid>
          </Card>
        </Grid>
      </Container>
    </>
  );
};

export default Login;
