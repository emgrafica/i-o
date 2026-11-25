import React from 'react';
import { MockedProvider, MockedResponse } from '@apollo/react-testing';
import resolvers from 'store/apollo/store/actions/resolvers';
import { render, fireEvent, act, screen, waitFor } from 'tests/utils';
import TopNav from '../';
import { SERVICE_SUBSCRIPTIONS } from 'graphql/queries/serviceSubscriptions';
import { AVAILABLE_FEATURE_CONFIG } from 'graphql/queries/topNav';

enum ResultTypes {
  AllSubscribed,
  AllHidden,
  AllPunchOut,
}

const mockData = (resultType: ResultTypes) => {
  const subscriptionInfo = (punchOutLink: string) => ({
    isSubscribed: resultType === ResultTypes.AllSubscribed,
    punchOutLink: resultType === ResultTypes.AllPunchOut ? punchOutLink : null,
    __typename: 'SubscriptionInfo',
  });
  return [
    {
      request: { query: SERVICE_SUBSCRIPTIONS },
      result: {
        data: {
          retrieveTenantConfig: {
            serviceSubscriptions: {
              requestAccessories: subscriptionInfo('requestAccessories'),
              requestComputers: subscriptionInfo('requestComputers'),
              requestMobileDevices: subscriptionInfo('requestMobileDevices'),
              requestRemoteAccess: subscriptionInfo('requestRemoteAccess'),
              requestSoftware: subscriptionInfo('requestSoftware'),
              getSupport: subscriptionInfo('getSupport'),
              __typename: 'ServiceSubscriptions',
            },
            __typename: 'TenantConfig',
          },
        },
      },
    },
    {
      request: { query: AVAILABLE_FEATURE_CONFIG },
      result: {
        data: {
          featureConfig: {
            requestFeatureItems: [
              {
                __typename: 'FeatureItem',
                featureValue: 'Computers',
                enabled: true,
                featureType: 'request',
                portalFeaturePath: '',
                isSubscribed: subscriptionInfo('requestComputers').isSubscribed,
                punchOutLink: subscriptionInfo('requestComputers').punchOutLink,
                punchOutMessage: '',
              },
              {
                __typename: 'FeatureItem',
                featureValue: 'Accessories',
                enabled: true,
                featureType: 'request',
                portalFeaturePath: '',
                isSubscribed: subscriptionInfo('requestAccessories')
                  .isSubscribed,
                punchOutLink: subscriptionInfo('requestAccessories')
                  .punchOutLink,
                punchOutMessage: '',
              },
              {
                __typename: 'FeatureItem',
                featureValue: 'Remote Access',
                enabled: true,
                featureType: 'request',
                portalFeaturePath: '',
                isSubscribed: subscriptionInfo('requestRemoteAccess')
                  .isSubscribed,
                punchOutLink: subscriptionInfo('requestRemoteAccess')
                  .punchOutLink,
                punchOutMessage: '',
              },
              {
                __typename: 'FeatureItem',
                featureValue: 'Mobility',
                enabled: true,
                featureType: 'request',
                portalFeaturePath: '',
                isSubscribed: subscriptionInfo('requestMobileDevices')
                  .isSubscribed,
                punchOutLink: subscriptionInfo('requestMobileDevices')
                  .punchOutLink,
                punchOutMessage: '',
              },
              {
                __typename: 'FeatureItem',
                featureValue: 'Software',
                enabled: true,
                featureType: 'request',
                portalFeaturePath: '',
                isSubscribed: subscriptionInfo('requestSoftware').isSubscribed,
                punchOutLink: subscriptionInfo('requestSoftware').punchOutLink,
                punchOutMessage: '',
              },
            ],
            manageFeatureItems: [
              {
                __typename: 'FeatureItem',
                featureValue: 'Orders & Incidents',
                enabled: true,
                featureType: 'manage',
                portalFeaturePath: '',
                isSubscribed: subscriptionInfo('manageOrdersIncidents')
                  .isSubscribed,
                punchOutLink: subscriptionInfo('manageOrdersIncidents')
                  .punchOutLink,
                punchOutMessage: '',
              },
              {
                __typename: 'FeatureItem',
                featureValue: 'Approvals',
                enabled: true,
                featureType: 'manage',
                portalFeaturePath: '',
                isSubscribed: subscriptionInfo('manageApprovals').isSubscribed,
                punchOutLink: subscriptionInfo('manageApprovals').punchOutLink,
                punchOutMessage: '',
              },
              {
                __typename: 'FeatureItem',
                featureValue: 'Technology',
                enabled: true,
                featureType: 'manage',
                portalFeaturePath: '',
                isSubscribed: subscriptionInfo('manageTechnology').isSubscribed,
                punchOutLink: subscriptionInfo('manageTechnology').punchOutLink,
                punchOutMessage: '',
              },
            ],
            allFeatureItems: [
              {
                __typename: 'FeatureItem',
                featureValue: 'Computers',
                enabled: true,
                featureType: 'request',
                portalFeaturePath: '',
                isSubscribed: subscriptionInfo('requestComputers').isSubscribed,
                punchOutLink: subscriptionInfo('requestComputers').punchOutLink,
                punchOutMessage: '',
              },
              {
                __typename: 'FeatureItem',
                featureValue: 'Accessories',
                enabled: true,
                featureType: 'request',
                portalFeaturePath: '',
                isSubscribed: subscriptionInfo('requestAccessories')
                  .isSubscribed,
                punchOutLink: subscriptionInfo('requestAccessories')
                  .punchOutLink,
                punchOutMessage: '',
              },
              {
                __typename: 'FeatureItem',
                featureValue: 'Remote Access',
                enabled: true,
                featureType: 'request',
                portalFeaturePath: '',
                isSubscribed: subscriptionInfo('requestRemoteAccess')
                  .isSubscribed,
                punchOutLink: subscriptionInfo('requestRemoteAccess')
                  .punchOutLink,
                punchOutMessage: '',
              },
              {
                __typename: 'FeatureItem',
                featureValue: 'Mobility',
                enabled: true,
                featureType: 'request',
                portalFeaturePath: '',
                isSubscribed: subscriptionInfo('requestMobileDevices')
                  .isSubscribed,
                punchOutLink: subscriptionInfo('requestMobileDevices')
                  .punchOutLink,
                punchOutMessage: '',
              },
              {
                __typename: 'FeatureItem',
                featureValue: 'Software',
                enabled: true,
                featureType: 'request',
                portalFeaturePath: '',
                isSubscribed: subscriptionInfo('requestSoftware').isSubscribed,
                punchOutLink: subscriptionInfo('requestSoftware').punchOutLink,
                punchOutMessage: '',
              },
              {
                __typename: 'FeatureItem',
                featureValue: 'Orders & Incidents',
                enabled: true,
                featureType: 'manage',
                portalFeaturePath: '',
                isSubscribed: subscriptionInfo('manageOrdersIncidents')
                  .isSubscribed,
                punchOutLink: subscriptionInfo('manageOrdersIncidents')
                  .punchOutLink,
                punchOutMessage: '',
              },
              {
                __typename: 'FeatureItem',
                featureValue: 'Approvals',
                enabled: true,
                featureType: 'manage',
                portalFeaturePath: '',
                isSubscribed: subscriptionInfo('manageApprovals').isSubscribed,
                punchOutLink: subscriptionInfo('manageApprovals').punchOutLink,
                punchOutMessage: '',
              },
              {
                __typename: 'FeatureItem',
                featureValue: 'Technology',
                enabled: true,
                featureType: 'manage',
                portalFeaturePath: '',
                isSubscribed: subscriptionInfo('manageTechnology').isSubscribed,
                punchOutLink: subscriptionInfo('manageTechnology').punchOutLink,
                punchOutMessage: '',
              },
            ],
            __typename: 'FeatureConfig',
          },
        },
      },
    },
  ];
};

const renderTopNav = (mocks: MockedResponse[]) =>
  render(
    <MockedProvider mocks={mocks} resolvers={resolvers}>
      <TopNav />
    </MockedProvider>,
  );
const setScreenWidth = async (width: number) => {
  await act(async () => {
    /* eslint-disable no-native-reassign */
    window = Object.assign(window, { innerWidth: width });
    window.dispatchEvent(new Event('resize'));
  });
};

const MOBILE_WIDTH = 300;
const DESKTOP_WIDTH = 1280;

describe('mobile menu functionality', () => {
  it('renders hamburger menu for small screens', async () => {
    renderTopNav(mockData(ResultTypes.AllSubscribed));
    await setScreenWidth(MOBILE_WIDTH);

    await waitFor(() => {
      expect(screen.getByTitle(/menu/i)).toBeInTheDocument();
    });
  });

  it('renders mobile navigation menu content when hamburger icon is clicked and tenant is subscribed to all services', async () => {
    renderTopNav(mockData(ResultTypes.AllSubscribed));
    await setScreenWidth(MOBILE_WIDTH);

    fireEvent.click(screen.getByTitle(/menu/i));
    await waitFor(() => {
      expect(screen.getByText(/^request$/i)).toBeInTheDocument();
      expect(screen.getByText(/^computers$/i)).toBeInTheDocument();
      expect(screen.getByText(/^accessories$/i)).toBeInTheDocument();
      expect(screen.getByText(/^remote access$/i)).toBeInTheDocument();
      expect(screen.getByText(/^mobility$/i)).toBeInTheDocument();
      expect(screen.getByText(/^software$/i)).toBeInTheDocument();

      expect(screen.getByText(/^manage$/i)).toBeInTheDocument();
      expect(screen.getByText(/^orders & incidents$/i)).toBeInTheDocument();
      expect(screen.getByText(/^approvals$/i)).toBeInTheDocument();
      expect(screen.getByText(/^technology$/i)).toBeInTheDocument();

      expect(screen.getByText(/^get support$/i)).toBeInTheDocument();
    });
  });
});

describe('desktop navigation menu functionality', () => {
  it('renders desktop navigation menu content when tenant is subscribed to all services', async () => {
    renderTopNav(mockData(ResultTypes.AllSubscribed));
    await setScreenWidth(DESKTOP_WIDTH);

    await waitFor(() => {
      expect(screen.getByText(/^request$/i)).toBeInTheDocument();
      expect(screen.getByText(/^manage$/i)).toBeInTheDocument();
      expect(screen.getByText(/^get support$/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/request/i));
    await waitFor(() => {
      expect(screen.getByText(/^computers$/i)).toBeInTheDocument();
      expect(screen.getByText(/^accessories$/i)).toBeInTheDocument();
      expect(screen.getByText(/^remote access$/i)).toBeInTheDocument();
      expect(screen.getByText(/^mobility$/i)).toBeInTheDocument();
      expect(screen.getByText(/^software$/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/manage/i));
    await waitFor(() => {
      expect(screen.getByText(/^orders & incidents$/i)).toBeInTheDocument();
      expect(screen.getByText(/^approvals$/i)).toBeInTheDocument();
      expect(screen.getByText(/^technology$/i)).toBeInTheDocument();
    });
  });
});

describe('dynamic request menu options when tenant is not subscribed', () => {
  it('hides request menu content when a punchout link is not provided', async () => {
    renderTopNav(mockData(ResultTypes.AllHidden));
    await setScreenWidth(DESKTOP_WIDTH);

    fireEvent.click(screen.getByText(/request/i));
    await waitFor(() => {
      expect(screen.queryByText(/^computers$/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/^accessories$/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/^remote access$/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/^mobility$/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/^software$/i)).not.toBeInTheDocument();
    });
  });

  it('request menu content opens modal with punchOut link when a punchOut link is provided', async () => {
    renderTopNav(mockData(ResultTypes.AllPunchOut));
    await setScreenWidth(DESKTOP_WIDTH);

    const testPunchOutLink = async (menuItem: string, punchOutLink: string) => {
      fireEvent.click(screen.getByText(/request/i));
      fireEvent.click(screen.getByText(new RegExp(menuItem, 'i')));

      await waitFor(() => {
        expect(screen.getByText(/^continue$/i).closest('a')).toHaveAttribute(
          'href',
          punchOutLink,
        );
      });

      fireEvent.click(screen.getByText(/close/i));
    };

    await testPunchOutLink('computers', 'requestComputers');
    await testPunchOutLink('accessories', 'requestAccessories');
    await testPunchOutLink('mobility', 'requestMobileDevices');
    await testPunchOutLink('remote access', 'requestRemoteAccess');
    await testPunchOutLink('software', 'requestSoftware');
  });
});
