import React from 'react';
import { ITypographyProps } from '@lumos/core/lib/components/Typography/Typography';
import { Box } from '@lumos/core';
import { useTranslation } from 'react-i18next';
import { GridLayout } from 'components/GridLayout';
import PageTemplate from 'components/PageTemplate';
import DownloadContent from './DownloadContent';
import StaticContent from './StaticContent';
export interface ComingSoonTemplateProps {
  title: string;
  subtitle: string;
  featureDescriptionText?: React.ReactElement<ITypographyProps>;
  /**
   * Text to help user navigate to v2 feature that relates to this upcoming feature.
   * Will include both text and a link
   */
  redirectActionComponent?: React.ReactElement<ITypographyProps>;
  /**
   * Text to help user navigate to v2 feature that relates to this upcoming feature.
   * Will include both text and a link
   */
  moreInfoComponent?: React.ReactElement<ITypographyProps>;
  // Background image for "Coming Soon" page
  backgroundImage: any;
  // Background image position for "Coming Soon" page
  backgroundPosition?: string;
  // Determines whether static content or downloadable content is rendered
  showDownloadableContent?: boolean;
  // Descriptive image of downloadable content
  downloadContentImage?: any;
}

/**
 * Template for all "Coming Soon" pages.
 * Will render a basic description of the upcoming features as well as links to navigate the user to the v2 version of the feature.
 */
const ComingSoonTemplate: React.FC<ComingSoonTemplateProps> = ({
  title,
  subtitle,
  featureDescriptionText,
  redirectActionComponent,
  moreInfoComponent,
  backgroundImage,
  backgroundPosition,
  showDownloadableContent,
  downloadContentImage,
}) => {
  const { t } = useTranslation('temporaryText');
  return (
    <Box
      backgroundImage={backgroundImage}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition={backgroundPosition}
      backgroundColor="#FFFFFF"
      height="100%"
    >
      <PageTemplate hasBanner={false} title={title}>
        <GridLayout columnGutters={0}>
          {showDownloadableContent ? (
            <DownloadContent
              title={t('showWipCollaboration.title')}
              description={t('showWipCollaboration.description')}
              downloadContentImage={downloadContentImage}
            />
          ) : (
            <StaticContent
              title={title}
              subtitle={subtitle}
              featureDescriptionText={featureDescriptionText}
              redirectActionComponent={redirectActionComponent}
              moreInfoComponent={moreInfoComponent}
            />
          )}
        </GridLayout>
      </PageTemplate>
    </Box>
  );
};

export default ComingSoonTemplate;
