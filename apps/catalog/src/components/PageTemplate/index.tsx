import React from 'react';
import { Grid, Box, Typography, Container } from '@lumos/core';
import PageTitle from 'components/PageTitle';
import titleBanner from 'assets/images/branding/titleBanner.png';

/** PageTemplate props */
interface PageTemplateProps {
  /** Title of the page and HTML title  */
  title: string;
  /** Subtitle of the page */
  subtitle?: string;
  /** Controls whether PageTemplate renders with a banner */
  hasBanner: boolean;
}

/**
 * Banner component used internally by the PageTemplate component
 *
 * @param props
 */
const Banner: React.FC<PageTemplateProps> = props => {
  return (
    <Box
      backgroundImage={`url(${titleBanner})`}
      alt="banner"
      width="100%"
      height={{ xxs: 85, md: 120 }}
    >
      <Container flexDirection="column">
        <Typography
          id="pageTitle"
          kind="h1"
          fontWeight="bold"
          fontSize={{ xxs: 3, md: 7 }}
          marginTop={{ xxs: '12px', md: '33px' }}
          marginBottom={2}
          marginX={{ xxs: '15px', sm: '25px', lg: '100px' }}
          color="grayScale.10"
        >
          {props.title}
        </Typography>
        <Typography
          id="pageSubtitle"
          kind="body1"
          fontSize={{ xxs: 1, md: 4 }}
          fontWeight="bold"
          marginTop="0px"
          marginBottom={12}
          marginX={{ xxs: '15px', sm: '25px', lg: '100px' }}
          color="grayScale.10"
        >
          {props.subtitle}
        </Typography>
      </Container>
    </Box>
  );
};

/**
 * Page template design to be used across all the pages in the app.
 * It renders the banner and sets the padding for the content of the page.
 *
 * @param props
 */
const PageTemplate: React.FC<PageTemplateProps> = props => (
  <Grid width="100%" height="100%" flexDirection="column">
    {props.hasBanner && <Banner {...props} />}
    <PageTitle title={props.title} />
    <Container
      display="box"
      width="100%"
      height="100%"
      paddingTop={{ xxs: '32px', md: '60px' }}
      paddingBottom={{ xxs: '52px', md: '100px' }}
    >
      <Box
        width="100%"
        height="100%"
        marginX={{ xxs: '15px', sm: '25px', lg: '100px' }}
      >
        {props.children}
      </Box>
    </Container>
  </Grid>
);

export default PageTemplate;
