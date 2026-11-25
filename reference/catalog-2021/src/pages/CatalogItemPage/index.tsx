import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router-dom';
import { CatalogItemClass } from 'gqlTypes/globalTypes';
import ErrorMessage from './ErrorMessage';
import PageTemplate from 'components/PageTemplate';
import { CATALOG_ITEM_DETAILS } from 'graphql/queries/catalog';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import {
  CatalogItemDetails,
  CatalogItemDetailsVariables,
} from 'graphql/queries/gqlTypes/CatalogItemDetails';
import { useUserId } from 'containers/AuthContainer/AuthContext';
import {
  CheckoutPath,
  RequestAccessoriesPath,
  RequestComputersPath,
  RequestMobilityPath,
} from 'utils/routes';
import { useOBOInfoLocalState } from 'store/apollo/store/hooks';
import { useCart } from 'store';
import CatalogItemDetailsBody from './CatalogItemDetailsBody';
import { titleMap, subTitleMap, backButtonPathMap } from './utils';
import { CartItem } from 'store/Cart';
import { LeaveModal } from 'components';
import {
  useReplacementInfo,
  useSetReplacementInfo,
} from '../../store/apollo/store/hooks';
import { CheckoutTypes } from '../CatalogPage/utils';

/**
 * Props for CatalogItemProps
 */
export interface CatalogItemProps extends RouteComponentProps {
  /**
   * catalogItemClass to be loaded
   */
  catalogItemClass: CatalogItemClass;
}

const getCatalogPage = (checkoutType: CheckoutTypes): string => {
  switch (checkoutType) {
    case CheckoutTypes.Computers:
      return RequestComputersPath;
    case CheckoutTypes.Accessories:
      return RequestAccessoriesPath;
    case CheckoutTypes.Mobility:
      return RequestMobilityPath;
  }
  throw new Error(`Unknown checkout type - ${checkoutType}`);
};

/**
 * Provides detailed information on selected catalog item and allows user to configure device prior to checkout
 */
const CatalogItemPage: React.FC<CatalogItemProps> = ({ catalogItemClass }) => {
  const location = useLocation<{ previousState?: any }>();
  const history = useHistory();
  // Get OBOUser
  const oboInfoLocalState = useOBOInfoLocalState();
  const oboUser = oboInfoLocalState && oboInfoLocalState.user;
  const userId = useUserId();
  const replacementInfo = useReplacementInfo();
  const [cart, setCart] = useCart(userId as string);
  const { catalogItemName } = useParams<{ catalogItemName: string }>();

  const { t } = useTranslation();

  // Declare and initialize variables to hold previous form state if previousState is present
  const selectedConfigurationToLoad =
    location.state &&
    location.state.previousState &&
    location.state.previousState;

  //TODO: We should consider to remove this useEffect after Checkout page refactoring gets done
  /* eslint-disable react-hooks/exhaustive-deps, no-console */
  /*
   * This useEffect only needs to run once after initial render because we
   * only need to check for previousState on initial render.
   * eslint wants us to add props.location and props.history to the dependency list,
   * but that will cause an infinite render loop since we're calling history.replace().
   * This is why react-hooks/exhaustive-deps is disabled here.
   *
   *
   * Reset previousState on initial render if previousState is present
   * This allows the form to reset on page reload
   */
  useEffect(() => {
    const state = { ...location.state };
    delete state.previousState;
    history.replace({ ...location, state });
  }, []);

  const { loading, error, data, refetch } = useQuery<
    CatalogItemDetails,
    CatalogItemDetailsVariables
  >(CATALOG_ITEM_DETAILS, {
    variables: {
      userId: oboUser ? oboUser.userId : userId!,
      catalogClass: catalogItemClass,
      catalogItemName: decodeURIComponent(catalogItemName),
      isComputer: catalogItemClass === CatalogItemClass.computer,
      isAccessory: catalogItemClass === CatalogItemClass.accessory,
      assignedToId: oboUser ? oboUser.userId : userId,
      isReplacement: !!replacementInfo,
      assetUsage: replacementInfo && replacementInfo.usage,
    },
  });

  const setReplacementInfo = useSetReplacementInfo();
  const exitReplacement = () => {
    setReplacementInfo(null);
  };

  /**
   * Sends user to the checkout page with required state
   */
  const submitSelectedConfiguration = (dataForCheckout: CartItem) => {
    setCart({
      ...cart,
      items: [
        {
          ...dataForCheckout,
        },
      ],
    });
    history.push(CheckoutPath, {
      force: true,
      from: getCatalogPage(dataForCheckout.checkoutType),
    });
  };
  return (
    <PageTemplate
      hasBanner
      title={t(titleMap[catalogItemClass])}
      subtitle={t(subTitleMap[catalogItemClass])}
    >
      {error ? (
        <ErrorMessage
          onRetry={() => {
            refetch();
          }}
          backButtonPath={backButtonPathMap[catalogItemClass]}
        />
      ) : (
        <CatalogItemDetailsBody
          loading={loading}
          catalogItemClass={catalogItemClass}
          catalogItemDetails={data}
          selectedConfigurationToLoad={selectedConfigurationToLoad}
          submitSelectedConfiguration={submitSelectedConfiguration}
        />
      )}
      {replacementInfo && (
        <LeaveModal
          title={t('pages:request.leaveModal.title')}
          content={t('pages:request.leaveModal.content')}
          onConfirm={exitReplacement}
        />
      )}
    </PageTemplate>
  );
};

export default CatalogItemPage;
