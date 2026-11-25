import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Grid, Form, Alert } from '@lumos/core';
import { useQuery } from '@apollo/react-hooks';
import { LocationOption, StepperAction } from '../../index';
import { Locations } from 'graphql/queries/gqlTypes/Locations';
import { GcomSites } from 'graphql/queries/gqlTypes/GcomSites';
import { LocationType } from 'gqlTypes/globalTypes';
import { GCOM_SITES, LOCATIONS } from 'graphql/queries';
import { UserProfileRequest_userProfile } from 'graphql/queries/gqlTypes/UserProfileRequest';
import { getSelectedOption } from 'pages/CatalogCommunicationsPage/utils';
import QueryErrorAlert from 'components/QueryErrorAlert';
import { CartGcomProduct } from 'store/Cart';

/**
 * Props for LocationOfService
 */
export interface LocationOfServiceProps {
  billedToUser: UserProfileRequest_userProfile;
  city?: string | null;
  currentUser: UserProfileRequest_userProfile;
  site?: string | null;
  siteCode?: string | null;
  state?: string | null;
  setCity: (city: string | null) => void;
  selectedSite?: LocationOption | null;
  setSelectedSite: (selectedSite: LocationOption) => void;
  setState: (state: string | null) => void;
  updateCurrentStep: (stepperAction: StepperAction) => void;
  setSelectedProduct: (selectedProduct: CartGcomProduct) => void;
}

/**
 * Location of service component
 */
const LocationOfService: React.FC<LocationOfServiceProps> = ({
  updateCurrentStep,
  billedToUser,
  state,
  setState,
  city,
  setCity,
  selectedSite,
  setSelectedSite,
  setSelectedProduct,
}) => {
  const { t } = useTranslation();

  // Query for states
  const {
    data: stateData,
    error: statesQueryError,
    refetch: refetchStatesQuery,
  } = useQuery<Locations>(LOCATIONS, {
    variables: {
      country: billedToUser.locationInfo.country,
      locationReturnType: LocationType.State,
    },
    skip: !billedToUser.locationInfo.country,
  });
  let stateOptions: LocationOption[] = [];
  if (stateData && stateData.locations) {
    stateOptions = stateData.locations.map((state: string) => {
      return { label: state, value: state };
    });
  }

  // Query for cities
  const {
    data: cityData,
    error: citiesQueryError,
    refetch: refetchCitiesQuery,
  } = useQuery<Locations>(LOCATIONS, {
    variables: {
      country: billedToUser.locationInfo.country,
      state: state,
      locationReturnType: LocationType.City,
    },
    skip: !billedToUser.locationInfo.country || !state,
  });
  let cityOptions: LocationOption[] = [];
  if (cityData && cityData.locations) {
    cityOptions = cityData.locations.map((city: string) => {
      return { label: city, value: city };
    });
  }

  // Query for sites
  const {
    data: siteData,
    error: sitesQueryError,
    refetch: refetchSitesQuery,
  } = useQuery<GcomSites>(GCOM_SITES, {
    variables: {
      country: billedToUser.locationInfo.country,
      state: state,
      city: city,
    },
    skip: !billedToUser.locationInfo.country || !state || !city,
  });
  let siteOptions: LocationOption[] = [];
  if (siteData && siteData.gcomSites) {
    siteOptions = siteData.gcomSites.map(gcomSite => {
      return { label: gcomSite.site, value: gcomSite.siteCode };
    });
  }

  return (
    <Box marginLeft={{ xxs: '0px', md: '52px', lg: '70px' }}>
      <Grid flexDirection="column">
        <Grid flexDirection="column">
          <Box maxWidth={{ xs: '314px', md: '556px' }} marginX="-12px">
            {/* Country */}
            <Form.Item
              htmlFor="countryLabel"
              label={t('pages:request.gcom.locationOfService.countryLabel')}
              tooltip={t('pages:request.gcom.locationOfService.countryTooltip')}
            >
              <Form.Dropdown
                id="selectCountryDropdown"
                buttonLabel=""
                onChange={() => {}}
                options={[]}
                selectedOption={{
                  label: billedToUser.locationInfo.country,
                  value: billedToUser.locationInfo.country,
                }}
                disabled
              />
            </Form.Item>
            {/* State */}
            <Form.Item
              htmlFor="stateLabel"
              label={t('pages:request.gcom.locationOfService.stateLabel')}
              required
              disabled={Boolean(statesQueryError)}
            >
              <Form.Dropdown
                id="selectStateDropdown"
                buttonLabel={t(
                  'pages:request.gcom.locationOfService.selectStateLPlaceholder',
                )}
                onChange={e => {
                  setState(e);
                  setCity(null);
                  setSelectedSite({
                    label: '',
                    value: '',
                  });
                }}
                options={stateOptions}
                selectedOption={
                  state
                    ? {
                        label: state,
                        value: state,
                      }
                    : null
                }
              />
            </Form.Item>
            {Boolean(statesQueryError) && (
              <QueryErrorAlert
                errorMessage={t(
                  'pages:request.gcom.locationOfService.selectStateQueryError',
                )}
                retryClickHandler={() => refetchStatesQuery()}
              />
            )}
            {/* City */}
            <Form.Item
              htmlFor="cityLabel"
              label={t('pages:request.gcom.locationOfService.cityLabel')}
              required
              disabled={Boolean(citiesQueryError)}
            >
              <Form.Dropdown
                id="sampleDropdown"
                buttonLabel={t(
                  'pages:request.gcom.locationOfService.selectCityPlaceholder',
                )}
                onChange={e => {
                  setCity(e);
                  setSelectedSite({
                    label: '',
                    value: '',
                  });
                }}
                options={cityOptions}
                selectedOption={
                  city
                    ? {
                        label: city,
                        value: city,
                      }
                    : null
                }
                disabled={!state}
              />
            </Form.Item>
            {Boolean(citiesQueryError) && (
              <QueryErrorAlert
                errorMessage={t(
                  'pages:request.gcom.locationOfService.selectCityQueryError',
                )}
                retryClickHandler={() => refetchCitiesQuery()}
              />
            )}
            {/* Site */}
            <Form.Item
              htmlFor="siteLabel"
              label={t('pages:request.gcom.locationOfService.siteLabel')}
              required
              marginBottom="30.5px"
              disabled={Boolean(sitesQueryError)}
            >
              <Form.Dropdown
                id="sampleDropdown"
                buttonLabel={t(
                  'pages:request.gcom.locationOfService.selectSitePlaceholder',
                )}
                onChange={async value => {
                  const selectedOption = getSelectedOption(siteOptions, value);

                  if (
                    selectedOption &&
                    selectedOption.value !== selectedSite!.value
                  ) {
                    setSelectedSite(selectedOption);
                  }
                }}
                options={siteOptions}
                selectedOption={
                  selectedSite && selectedSite.label !== ''
                    ? selectedSite
                    : null
                }
                disabled={
                  !city || (siteData && siteData.gcomSites.length === 0)
                }
              />
            </Form.Item>
            {siteData && siteData.gcomSites.length === 0 ? (
              <Box paddingLeft="12px" marginTop="15px">
                <Alert
                  kind="warning"
                  message={t(
                    'pages:request.gcom.locationOfService.noSiteAvailableMessage',
                  )}
                  closeable
                  compact
                  paddingTop="6px"
                  paddingBottom="6px"
                />
              </Box>
            ) : null}
            {Boolean(sitesQueryError) && (
              <Box marginBottom="30.5px">
                <QueryErrorAlert
                  errorMessage={t(
                    'pages:request.gcom.locationOfService.selectSiteQueryError',
                  )}
                  retryClickHandler={() => refetchSitesQuery()}
                />
              </Box>
            )}
          </Box>
        </Grid>
        <Box
          marginBottom="24px"
          marginTop={
            siteData && siteData.gcomSites.length === 0 ? '15px' : '40px'
          }
        >
          <Button
            kind="secondary"
            marginRight="20px"
            minWidth="105px"
            onClick={() => {
              setState(null);
              setCity(null);
              setSelectedSite({
                label: '',
                value: '',
              });
              updateCurrentStep(StepperAction.Back);
            }}
          >
            {t('common:back')}
          </Button>
          <Button
            kind="secondary"
            minWidth="105px"
            onClick={() => {
              setSelectedProduct({ label: '', value: '' });
              updateCurrentStep(StepperAction.Continue);
            }}
            disabled={
              !billedToUser.locationInfo.country ||
              !state ||
              !city ||
              !selectedSite ||
              selectedSite.value === ''
            }
          >
            {t('common:continue')}
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};

export default LocationOfService;
