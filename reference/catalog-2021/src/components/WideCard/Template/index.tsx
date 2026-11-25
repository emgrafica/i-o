import { Box, Card, Grid } from '@lumos/core';
import { ShowFor } from 'components';
import LoadingScreen from 'components/LoadingScreen';
import HorizontalLine from 'components/HorizontalLine';
import Badge from 'components/Badge';
import React, { ReactNode } from 'react';
import useDevice, { Device } from 'utils/useDevice';
import { ThumbnailBoxLarge, ThumbnailBoxSmall } from './ThumbnailBox';
import { CollapsibleButton } from './CollapsibleButton';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

/** Props for WideCard.Template*/
export interface TemplateProps {
  /** If true the cards renders a loading spinner and the other props are ignored */
  loading?: boolean;
  /**The thumbnail of the card*/
  thumbnail?: ReactNode;
  /** The content of the card header */
  header?: ReactNode;
  /** The content of the card body */
  body?: ReactNode;

  /**
   * Optional prop to pass either a button or a list of buttons
   * for the card actions
   */
  buttons?: ReactNode | ReactNode[];
  /** The minimum height for the card for the mobile breakpoint
   *  @default 250px
   */
  minHeightMobile?: string;

  /** The minimum height for the card for the tablet breakpoint
   *  @default 150px
   */
  minHeightTablet?: string;

  /** The minimum height for the card for the desktop breakpoint and larger
   *  @default 150px
   */
  minHeightDesktop?: string;
  /** Props to create collapsible show more/less clamping button for mobile */
  collapsibleButtonProps?: {
    /** Determines whether or not to show the clamping button */
    isVisible: boolean;
    /** State of the clamping button */
    isExpanded: boolean;
    /** Action for onClick of clamping button */
    onClick: () => void;
  };
  /** Optional text to display as a badge in the top left corner of the card */
  badgeText?: string;

  /** Optional boolean for setting the opacity of the overall card */
  showOverlay?: boolean;

  /**Id for testing*/
  'data-testid': string;
}

/**
 * Template component for wide cards (e.g. orders,
 * incidents, approvals and technology cards). The
 * component takes care of the general layout of the card,
 * creating the header section, positioning the thumbnail, the
 * buttons and the body of the card for the different breakpoints
 *
 * The wide cards should be placed inside a WideCard.List component.
 * */
const Template: React.FC<TemplateProps> = ({
  loading,
  thumbnail,
  buttons: buttonsProps,
  header,
  body,
  minHeightMobile,
  minHeightTablet,
  minHeightDesktop,
  collapsibleButtonProps: collapsibleButton,
  badgeText,
  showOverlay,

  'data-testid': testId,
}) => {
  const device = useDevice();
  const { t } = useTranslation('common');
  const buttons = Array.isArray(buttonsProps) ? buttonsProps : [buttonsProps];
  let minHeight: string;
  if (device === Device.Mobile) minHeight = minHeightMobile || '250px';
  else if (device === Device.Tablet) minHeight = minHeightTablet || '150px';
  else minHeight = minHeightDesktop || '150px';

  const overlayOpacity = showOverlay ? '0.5' : '1';

  return (
    <Card
      data-testid={testId}
      minHeight={minHeight}
      padding="12px 20px"
      maxWidth="920px"
    >
      {loading ? (
        <Box height={minHeight}>
          <LoadingScreen />
        </Box>
      ) : (
        <>
          {badgeText && (
            <Box
              marginTop="-12px"
              marginLeft="-20px"
              marginBottom="6px"
              opacity={overlayOpacity}
            >
              <Badge text={badgeText} />
            </Box>
          )}
          <ShowFor tabletAndLarger>
            <Box opacity={overlayOpacity}>
              <ThumbnailBoxLarge>{thumbnail}</ThumbnailBoxLarge>
            </Box>
            <Grid maxWidth="100%" flexDirection="column">
              <Box opacity={overlayOpacity}>
                {header}
                <HorizontalLine />
              </Box>
              <Grid flexDirection="row" width="100%" maxWidth="100%">
                <Box width="100%" opacity={overlayOpacity}>
                  {body}
                </Box>
                <Grid
                  marginLeft={{ xxs: '40px', lg: '70px' }}
                  width="175px"
                  justifyContent="center"
                  alignItems="stretch"
                  flexDirection="column"
                  marginBottom="-13px"
                >
                  {buttons.map((button, index) => (
                    <Grid
                      flexDirection="column"
                      marginTop={index ? '16px' : '0'}
                      key={index}
                    >
                      {button}
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </ShowFor>

          <ShowFor mobile>
            <Grid width="100%" flexDirection="column" alignItems="stretch">
              <Grid width="100%" opacity={overlayOpacity}>
                <ThumbnailBoxSmall>{thumbnail}</ThumbnailBoxSmall>
                {header}
              </Grid>
              <Box opacity={overlayOpacity}>
                <HorizontalLine />
                {body}
                {collapsibleButton && collapsibleButton.isVisible && (
                  <Grid alignSelf="flex-start">
                    <CollapsibleButton
                      kind="text"
                      withIconOnRight={
                        collapsibleButton.isExpanded ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )
                      }
                      onClick={collapsibleButton.onClick}
                    >
                      {collapsibleButton.isExpanded ? t('less') : t('more')}
                    </CollapsibleButton>
                  </Grid>
                )}
              </Box>
              <Grid width="100%" flexDirection="row" marginTop="18px">
                {buttons.map((button, index) => (
                  <Grid
                    flexDirection="column"
                    flexGrow={1}
                    marginLeft={index ? '16px' : '0'}
                    key={index}
                  >
                    {button}
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </ShowFor>
        </>
      )}
    </Card>
  );
};

export default Template;
