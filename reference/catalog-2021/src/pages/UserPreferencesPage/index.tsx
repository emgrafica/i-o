import React from 'react';
import PageTitle from 'components/PageTitle';
import { useTranslation } from 'react-i18next';

/**
 * Components.
 */
import {
  Grid,
  Box,
  Card,
  Typography,
  Button,
  Form,
  Popover,
  Avatar,
  useToasts,
} from '@lumos/core';
import { AccountCircle, InfoOutlined } from '@material-ui/icons';
/**
 * Constants.
 */
import { TOP_NAV_HEIGHT } from '../../constants';
/**
 * Popover for 'country' field in address form.
 */
const CountryPopover: React.FC = ({ children }) => (
  <Box margin="16px">
    <Typography kind="body2" mb={0}>
      {children}
    </Typography>
  </Box>
);

const MOCK_USER = {
  name: 'Jane Doe',
  department: 'Technology Operations',
  supervisor: 'Jane Doe',
  email: 'jane.doe@email.com',
  address: {
    address1: '123 Main St',
    address2: 'Suite 680',
    city: 'Miami',
    state: 'FL',
    zip: '33133',
    country: 'United States',
  },
};

/**
 * User preferences page.
 */
const UserPreferencesPage: React.FC = () => {
  const { t } = useTranslation();
  const { addToast } = useToasts();

  /**
   * Handler for when user submits the address editing
   * form.
   */
  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast(t('addressForm:successfulSave'), {
      // Lumos typing issue, will be removed when fixed there
      // @ts-ignore
      kind: 'success',
      // Lumos typing issue, will be removed when fixed there
      // @ts-ignore
      autoDismiss: 4000,
    });
  };

  return (
    <>
      <PageTitle title={t('userPreferences:title')} />
      <Grid
        alignItems="flex-start"
        justifyContent="center"
        flexDirection={['column', 'column', 'column', 'row']}
        width="100%"
      >
        {/* Preferences sidebar */}
        <Box
          height={{
            xs: 'auto',
            sm: 'auto',
            md: `calc(100vh - 70px - ${TOP_NAV_HEIGHT}px)`,
            lg: `calc(100vh - 70px - ${TOP_NAV_HEIGHT}px)`,
            xl: `calc(100vh - 70px - ${TOP_NAV_HEIGHT}px)`,
          }}
          backgroundColor="#F2F2F2"
          flex="1"
          width={1}
        >
          <Box textAlign="center" p={5}>
            <Avatar alt="Profile image" height="80px" width="80px" />
            <Typography kind="h4" fontWeight={600} py={2}>
              {MOCK_USER.name}
            </Typography>
          </Box>

          {/* Tabs */}
          <Grid
            borderTopWidth={2}
            borderTopColor="primary.0"
            borderTopStyle="solid"
            borderBottomWidth={2}
            borderBottomColor="primary.0"
            borderBottomStyle="solid"
            alignItems="center"
            backgroundColor="white"
            justifyContent={['center', 'center', 'center', 'flex-start']}
            py={2}
            px={5}
          >
            <AccountCircle />
            <Typography kind="h6" my={0} ml={2} fontWeight="bold">
              {t('userPreferences:profile')}
            </Typography>
          </Grid>
        </Box>

        {/* Profile info */}
        <Card
          title={t('userPreferences:profileInfo')}
          position="relative"
          topRule
          rounded
          backgroundColor="white"
          flex={[1, 1, 1, 2]}
          pb={[0, 0, 0, 8]}
          mx={[0, 0, 0, 3]}
          width={1}
        >
          {/* Department */}
          <Box py={2}>
            <Typography kind="h6" fontWeight="bold">
              {t('userPreferences:department')}
            </Typography>
            <Typography kind="body2">{MOCK_USER.department}</Typography>
          </Box>

          {/* Supervisor */}
          <Box py={2}>
            <Typography kind="h6" fontWeight="bold">
              {t('userPreferences:supervisor')}
            </Typography>
            <Typography kind="body2">{MOCK_USER.supervisor}</Typography>
          </Box>

          {/* Email */}
          <Box py={2}>
            <Typography kind="h6" fontWeight="bold">
              {t('userPreferences:email')}
            </Typography>
            <Typography kind="body2">{MOCK_USER.email}</Typography>
          </Box>

          {/* Work address */}
          <Box py={2}>
            <Typography kind="h6" fontWeight="bold">
              {t('userPreferences:workAddress')}
            </Typography>
            <Typography kind="body2">{MOCK_USER.address.address1}r</Typography>
            <Typography kind="body2">{MOCK_USER.address.address2}</Typography>
            <Typography kind="body2">
              {MOCK_USER.address.city}, {MOCK_USER.address.state}{' '}
              {MOCK_USER.address.zip}
            </Typography>
          </Box>

          {/* Update info action */}
          <Box
            position={[
              'relative',
              'relative',
              'relative',
              'relative',
              'absolute',
            ]}
            textAlign={['center', 'center', 'center', 'center', 'start']}
            m={2}
            bottom="0px"
            right="0px"
          >
            <Button kind="text">
              {t('userPreferences:updateProfileInfo')}
            </Button>
          </Box>
        </Card>

        {/* Shipping address editor */}
        <Card
          title={t('addressForm:shippingAddress')}
          topRule
          rounded
          mx={[0, 0, 0, 3]}
          backgroundColor="white"
          flex={[1, 1, 1, 2]}
          width={1}
        >
          {/* Form description */}
          <Typography kind="body2">{t('addressForm:changeAddress')}</Typography>
          <Form
            p={0}
            m={0}
            name="EditShippingAddressForm"
            onSubmit={handleAddressSubmit}
          >
            {/* Address 1 */}
            <Form.Item
              label={t('addressForm:address1')}
              htmlFor="address1Input"
              required
              m={1}
            >
              <Form.Input
                id="address1Input"
                maxLength={60}
                type="text"
                placeholder={t('addressForm:address1')}
              />
            </Form.Item>
            {/* Address 2 */}
            <Form.Item
              label={t('addressForm:address2')}
              htmlFor="address2Input"
              m={1}
            >
              <Form.Input
                id="address2Input"
                maxLength={60}
                type="text"
                placeholder={t('addressForm:address2')}
              />
            </Form.Item>
            {/* City */}
            <Form.Item
              label={t('addressForm:city')}
              htmlFor="cityInput"
              required
              m={1}
            >
              <Form.Input
                id="cityInput"
                maxLength={60}
                type="text"
                placeholder={t('addressForm:city')}
              />
            </Form.Item>
            <Grid alignItems="flex-end">
              {/* State */}
              <Box flex="1">
                <Form.Item
                  label={t('addressForm:stateProvinceRegion')}
                  htmlFor="stateInput"
                  required
                  m={1}
                >
                  <Form.Input
                    id="stateInput"
                    maxLength={60}
                    type="text"
                    placeholder={t('addressForm:stateProvinceRegion')}
                  />
                </Form.Item>
              </Box>

              {/* Zip */}
              <Box flex="1">
                <Form.Item
                  label={t('addressForm:zip')}
                  htmlFor="zipInput"
                  required
                  m={1}
                >
                  <Form.Input
                    id="zipInput"
                    maxLength={30}
                    type="text"
                    placeholder={t('addressForm:zip')}
                  />
                </Form.Item>
              </Box>
            </Grid>

            {/* Country */}
            <Grid alignItems="center" py={2} mx={1} pb={0}>
              <Typography kind="label" my={1}>
                {t('addressForm:country')}
              </Typography>
              <Popover
                id="countryPopover"
                placement="top"
                content={
                  <CountryPopover>
                    {t('addressForm:countryTooltip')}
                  </CountryPopover>
                }
              >
                <Button kind="text" type="button" p={1} ml={1}>
                  <InfoOutlined />
                </Button>
              </Popover>
            </Grid>

            <Typography kind="body2" mx={1}>
              {MOCK_USER.address.country}
            </Typography>

            {/* Phone Number */}
            <Form.Item
              label={t('addressForm:phone')}
              htmlFor="phoneInput"
              m={1}
            >
              <Form.Input
                id="phoneInput"
                maxLength={60}
                type="text"
                placeholder={t('addressForm:phone')}
              />
            </Form.Item>
            {/* Delivery Instructions */}
            <Form.Item
              label={t('addressForm:deliveryInstructions')}
              htmlFor="deliveryInstructionsInput"
              m={1}
            >
              <Form.Input
                id="deliveryInstructionsInput"
                maxLength={60}
                type="text"
                placeholder={t('addressForm:deliveryInstructions')}
              />
            </Form.Item>

            {/* Edit actions */}
            <Grid justifyContent="flex-end">
              <Button kind="secondary" type="button">
                {t('common:reset')}
              </Button>
              <Button kind="primary" type="submit">
                {t('common:save')}
              </Button>
            </Grid>
          </Form>
        </Card>
      </Grid>
    </>
  );
};

export default UserPreferencesPage;
