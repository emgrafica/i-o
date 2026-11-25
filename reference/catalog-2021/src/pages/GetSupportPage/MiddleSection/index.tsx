import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Container, Grid, Alert } from '@lumos/core';
import useBreakpoint, { Breakpoint } from 'utils/useBreakpoint';
import Subcategories from './Subcategories';
import { getCategories } from './constants';
import { KnowledgeArticleLanguageCode } from 'gqlTypes/globalTypes';
import { ShowFor } from 'components';
import { useKnowledgeArticlesLanguage } from 'store';

const MiddleSection: React.FC = () => {
  const breakpoint = useBreakpoint();
  const { t } = useTranslation('getSupport');
  const categories = getCategories(t);
  const [knowledgeArticlesLanguage] = useKnowledgeArticlesLanguage();

  return (
    <Container
      paddingY="44px"
      paddingX="24px"
      flexDirection="column"
      alignItems="center"
    >
      <Grid flexDirection="column" maxWidth={{ xxs: '556px', lg: '1120px' }}>
        <Typography
          kind={breakpoint <= Breakpoint.sm ? 'h5' : 'h4'}
          marginBottom="20px"
        >
          {t('middleSection.header')}
        </Typography>
        <ShowFor tabletAndLarger>
          {knowledgeArticlesLanguage !== KnowledgeArticleLanguageCode.en && (
            <Alert
              marginTop="4px"
              marginBottom="8px"
              kind="active"
              compact
              fullWidth
              message={t('middleSection.resultsInEnglish')}
            />
          )}
        </ShowFor>

        <Grid
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="baseline"
          marginTop={{ xxs: '24px', lg: '60px' }}
        >
          {categories.map(category => (
            <Grid
              flexDirection="column"
              width={{ xxs: '100%', xs: '44%', lg: '22%' }}
              key={category.label}
              marginBottom="32px"
            >
              <img src={category.icon} alt="" width="40px" height="40px" />
              <Typography
                kind="h6"
                fontSize="22px"
                fontWeight="300"
                marginTop="8px"
              >
                {category.label}
              </Typography>
              <Subcategories subcategories={category.subcategories} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default MiddleSection;
