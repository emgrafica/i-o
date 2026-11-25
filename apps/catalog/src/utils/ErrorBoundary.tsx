/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import * as React from 'react';
import { Translation } from 'react-i18next';
import { Box, Typography, Grid, Button } from '@lumos/core';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { HomePath } from 'utils/routes';
import ChairsWat from 'assets/images/errorBoundary/chairsWat.png';

class ErrorBoundary extends React.Component<RouteComponentProps> {
  state = {
    error: null,
    hasError: false,
    pathname: this.props.location.pathname,
  };

  /*
    - If any error is thrown from a descendant,
        it is caught here and <ErrorBoundary />'s state is updated.
    - <ErrorBoundary /> can now conditionally do things based on error.
  */
  static getDerivedStateFromError(
    error: Error,
  ): { hasError: boolean; error: Error } {
    return { hasError: true, error };
  }

  componentDidUpdate() {
    const { location } = this.props;
    const { pathname } = this.state;
    if (pathname !== location.pathname) {
      this.setState({ pathname: location.pathname });
    }
  }

  /*
    - Side effects related to error handling, i.e. logging, should be handled here
    - We will replace the console.error with a call to an error logging service
  */
  componentDidCatch(stackTrace: any): void {
    console.error(stackTrace);
  }

  render(): React.ReactNode {
    const { children, history, location } = this.props;
    const { error, pathname } = this.state;
    if (error) {
      if (pathname !== location.pathname) {
        window.location.reload();
      }
      return (
        <Grid
          minHeight="100%"
          flexDirection="column"
          paddingY="36px"
          backgroundColor="grayScale.2"
          position="relative"
        >
          <Box
            backgroundImage={`url(${ChairsWat})`}
            backgroundSize={{ xxs: 'cover', xxl: 'cover' }}
            backgroundPosition="center"
            height={{ xxs: '574px', xs: '974px', sm: '974px', md: '1771px' }}
            width="100%"
            position="absolute"
            bottom="0"
            marginBottom={{
              xxs: '-170px',
              xs: '-295px',
              sm: '-295px',
              md: '-550px',
            }}
          />
          <Grid
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              backgroundColor="grayScale.1"
              width={{ xxs: '298px', xs: '547px' }}
              height={{ xxs: '551px', xs: '800px' }}
              maxWidth="100%"
            >
              <Box
                // Header
                width="100%"
                height="auto"
              >
                <Box textAlign="center">
                  <Translation>
                    {t => (
                      <Typography
                        kind="h1"
                        textAlign="center"
                        fontSize="80px"
                        fontWeight="540"
                        paddingBottom={{ xxs: 0, xs: 4 }}
                      >
                        {t('pages:errorBoundary.title')}
                      </Typography>
                    )}
                  </Translation>
                </Box>
                <Translation>
                  {t => (
                    <Typography
                      kind="h3"
                      textAlign="center"
                      fontSize={{ xxs: 2, xs: '31px' }}
                    >
                      {t('pages:errorBoundary.subtitle')}
                    </Typography>
                  )}
                </Translation>
              </Box>
              <Grid
                // Subheader
                width="100%"
                height="auto"
                justifyContent="center"
              >
                <Box width="450px">
                  <Translation>
                    {t => (
                      <Typography
                        kind="h6"
                        fontWeight="normal"
                        textAlign="center"
                        marginTop="18px"
                        fontSize={{ xxs: 1, xs: 2 }}
                        margin={2}
                      >
                        {t('pages:errorBoundary.body')}
                      </Typography>
                    )}
                  </Translation>
                </Box>
              </Grid>
              <Grid
                flexDirection={{ xxs: 'column-reverse', xs: 'row' }}
                justifyContent="center"
                alignItems="center"
                paddingBottom="60px"
                paddingTop="20px"
              >
                <Box zIndex={1}>
                  <Button
                    kind="text"
                    margin={0}
                    padding={2}
                    onClick={() => window.location.reload()}
                  >
                    <Translation>
                      {t => (
                        <Typography
                          kind="body3"
                          margin={0}
                          paddingLeft={2}
                          paddingRight={2}
                        >
                          {t('pages:errorBoundary.refreshButton')}
                        </Typography>
                      )}
                    </Translation>
                  </Button>
                </Box>
                <Box zIndex={1}>
                  <Button
                    kind="impact2"
                    margin={0}
                    marginLeft={{ xxs: 0, xs: 4 }}
                    marginBottom={{ xxs: 3, xs: 0 }}
                    padding={2}
                    onClick={() => {
                      if (location.pathname === HomePath) {
                        window.location.reload();
                      } else {
                        history.push(HomePath);
                      }
                    }}
                  >
                    <Translation>
                      {t => (
                        <Typography
                          kind="body3"
                          margin={0}
                          paddingLeft={2}
                          paddingRight={2}
                        >
                          {t('pages:errorBoundary.goBackHomeButton')}
                        </Typography>
                      )}
                    </Translation>
                  </Button>
                </Box>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      );
    }
    return children;
  }
}

export default withRouter(ErrorBoundary);
