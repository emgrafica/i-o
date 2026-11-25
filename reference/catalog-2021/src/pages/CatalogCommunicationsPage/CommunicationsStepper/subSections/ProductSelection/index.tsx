import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Box, Button, Grid, Form, Typography } from '@lumos/core';
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import { SkuAnswer } from 'gqlTypes/globalTypes';
import { CATALOG_GCOM_ITEMS } from 'graphql/queries';
import {
  GComResolveSku_gcomResolveSku_components as GComComponent,
  GComResolveSku_gcomResolveSku_sku as Sku,
} from 'graphql/queries/gqlTypes/GComResolveSku';
import { UserProfileRequest_userProfile } from 'graphql/queries/gqlTypes/UserProfileRequest';
import { GcomItems_gcomItems } from 'graphql/queries/gqlTypes/GcomItems';
import { useUserId } from 'containers/AuthContainer/AuthContext';
import LoadingScreen from 'components/LoadingScreen';
import { useOBOInfoLocalState } from 'store/apollo/store/hooks';
import ProductParser from './ProductParser';
import {
  parseProductItemToDropdownOptions,
  getSelectedOption,
  fetchNextComponents,
  updateComponentsAndAnswers,
  DropdownOption,
  createQuestionAnswerMap,
  SPECIAL_REQUEST_SKU,
  SEARCH_COMPONENT,
} from '../../../utils';
import { IHash, CartGcomProduct } from 'store/Cart';
import { LocationOption, StepperAction } from '../../index';
import HelpMeDecideModal from './components/HelpMeDecideModal';
import SelectedSkuSummary from './components/SelectedSkuSummary';
import { HelpMeDecideGrid } from './index.style';
import { useDebouncedCallback } from 'utils/useDebounce';
import QueryErrorAlert from 'components/QueryErrorAlert';

/**
 * Props for ProductSelection
 */
export interface ProductSelectionProps {
  currentUser: UserProfileRequest_userProfile;
  selectedSku?: Sku | null;
  setSelectedSku: (selectedSku: Sku | null) => void;
  selectedProduct: CartGcomProduct;
  setSelectedProduct: (selectedProduct: CartGcomProduct) => void;
  selectedSkuComponents: GComComponent[];
  setSelectedSkuComponents: (selectedSkuComponents: GComComponent[]) => void;
  selectedSkuAnswers: IHash;
  setSelectedSkuAnswers: (selectedSkuAnswers: IHash) => void;
  site: LocationOption;
  updateCurrentStep: (stepperAction: StepperAction) => void;
}

/**
 * Product selection component
 */
const ProductSelection: React.FC<ProductSelectionProps> = ({
  currentUser,
  selectedSku,
  setSelectedSku,
  site,
  updateCurrentStep,
  selectedProduct,
  setSelectedProduct,
  selectedSkuComponents,
  setSelectedSkuComponents,
  selectedSkuAnswers,
  setSelectedSkuAnswers,
}) => {
  const { t } = useTranslation();
  const client = useApolloClient();
  const oboInfoLocalState = useOBOInfoLocalState();
  const oboUser = oboInfoLocalState && oboInfoLocalState.user;
  const userId = useUserId();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [components, setComponents] = useState<GComComponent[]>([]);
  const [skuAnswers, setSkuAnswers] = useState<SkuAnswer[]>([]);
  const [notEligibleError, setNotEligibleError] = useState(false);
  const [
    productSelectionFollowUpError,
    setProductSelectionFollowUpError,
  ] = useState('');

  const { error, data, loading, refetch: refetchGcomCatalogItems } = useQuery(
    CATALOG_GCOM_ITEMS,
    {
      variables: {
        userId: oboUser ? oboUser.userId : userId!,
        site: site.value,
      },
      skip: !site.value,
      // triggers a re-render when the user refetches this query
      notifyOnNetworkStatusChange: true,
    },
  );

  // If there is only one product option, or there is a default, display it and then
  // make the call for the next dropdown/input
  useEffect(() => {
    if (
      data &&
      data.gcomItems &&
      data.gcomItems.length > 0 &&
      selectedProduct.value === ''
    ) {
      const defaultValue = data.gcomItems.find(
        (item: GcomItems_gcomItems) => item.default,
      );
      if (defaultValue) {
        const selectedOption = {
          label: defaultValue.name || data.gcomItems[0].label,
          value: defaultValue.code || data.gcomItems[0].value,
        };
        setSelectedProduct(selectedOption);
        setProductAnswersStates([], [], selectedOption, 0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, selectedProduct]);

  const fetchSkuQuestions = async (
    components: GComComponent[],
    skuAnswers: SkuAnswer[],
    selectedProductOption: DropdownOption,
    updatedComponent?: GComComponent,
    inputId?: string,
  ) => {
    const nextComponents = await fetchNextComponents(
      components,
      skuAnswers,
      client,
      selectedProductOption,
      setNotEligibleError,
      setProductSelectionFollowUpError,
      updatedComponent,
      inputId,
      currentUser.userId,
      site.value,
    );

    // Sets states for questions and answers
    setComponents(nextComponents.updatedComponents);
    setSelectedSku(nextComponents.updatedSku);
    setSelectedSkuComponents(nextComponents.selectedSkuComponents);
  };

  const debouncedFetchSkuQuestions = useDebouncedCallback(
    fetchSkuQuestions,
    500,
  );

  const setProductAnswersStates = async (
    components: GComComponent[],
    skuAnswers: SkuAnswer[],
    selectedProductOption: DropdownOption,
    index: number,
    updatedComponent?: GComComponent,
    input?: string,
  ) => {
    setNotEligibleError(false);

    // Update components and answers states with new selection
    const updatedComponentsAnswers = updateComponentsAndAnswers(
      components,
      skuAnswers,
      index,
      updatedComponent,
      input,
    );

    // Set answers selected to reflect them inmediatly
    setSkuAnswers(updatedComponentsAnswers.updatedSkuAnswers);

    // We can manage the debounce condition from the parser,
    // if we return a debounce flag from graphiti as part of the component response
    if (
      updatedComponent &&
      updatedComponent.componentType === SEARCH_COMPONENT
    ) {
      // If the component that changed is a Search component, we have to debounce the call
      if (input) {
        // We have to trigger the call only if the input is not empty
        debouncedFetchSkuQuestions(
          updatedComponentsAnswers.updatedComponents,
          updatedComponentsAnswers.updatedSkuAnswers,
          selectedProductOption,
          updatedComponent,
          input,
        );
      } else {
        // we have to clean Search SKU answers if Input is empty
        setSelectedSkuComponents([]);
        setSelectedSku(null);
      }
    } else {
      fetchSkuQuestions(
        updatedComponentsAnswers.updatedComponents,
        updatedComponentsAnswers.updatedSkuAnswers,
        selectedProductOption,
        updatedComponent,
        input,
      );
    }
  };

  const productOptions =
    data && data.gcomItems
      ? parseProductItemToDropdownOptions(data.gcomItems)
      : [];

  // Validate if can move to Checkout page
  const isValidToProceedToCheckout = () => {
    let isValid = true;
    if (selectedSku) {
      const skuAnswersHash = selectedSkuAnswers[selectedSku.sku];
      for (let i = 0; i < selectedSkuComponents.length; i++) {
        const selectedSkuComponent = selectedSkuComponents[i];
        if (
          selectedSkuComponent.required &&
          !(skuAnswersHash && skuAnswersHash[selectedSkuComponent.id])
        ) {
          isValid = false;
          break;
        }
      }
    } else {
      isValid = false;
    }
    return isValid;
  };

  const answersHashMap = createQuestionAnswerMap(components, skuAnswers);
  const queryErrorMessage =
    (error && error.message) || productSelectionFollowUpError;
  return (
    <Box
      marginLeft={{ xxs: '0px', md: '52px', lg: '70px' }}
      marginY="24px"
      minHeight="250px"
    >
      {loading ? (
        <LoadingScreen />
      ) : Boolean(queryErrorMessage) ? (
        <QueryErrorAlert
          errorMessage={t(
            'pages:request.gcom.productSelection.productSelectionQueryError',
          )}
          retryClickHandler={refetchGcomCatalogItems}
        />
      ) : !error && !loading && data ? (
        <Form name="productSelection" padding="0px">
          <Box maxWidth={{ xs: '314px', md: '556px' }}>
            {/* Product selection Section */}
            <Form.Section paddingLeft={0} marginBottom={4}>
              <Form.Item
                htmlFor="plug-dropdown"
                required
                label={t('pages:request.gcom.productSelection.productOptions')}
                disabled={false}
                paddingX={0}
              >
                <Form.Dropdown
                  buttonLabel={t(
                    'pages:request.gcom.productSelection.selectProductOption',
                  )}
                  placeholder={t(
                    'pages:request.gcom.productSelection.selectProductOption',
                  )}
                  onChange={async value => {
                    const selectedOption = getSelectedOption(
                      productOptions,
                      value,
                    );
                    if (
                      selectedOption &&
                      selectedOption.value !== selectedProduct.value
                    ) {
                      setProductAnswersStates([], [], selectedOption, 0);
                      setSelectedProduct(selectedOption);
                    }
                  }}
                  options={productOptions}
                  selectedOption={
                    selectedProduct.label !== '' ? selectedProduct : null
                  }
                  aria-label={t(
                    'pages:request.gcom.productSelection.selectProductOption',
                  )}
                  disabled={productOptions.length === 1}
                />

                <HelpMeDecideGrid
                  paddingTop="4px"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Typography kind="body3" margin="0px" color="impact.0">
                    {t('pages:request.gcom.productSelection.helpMeDecide')}
                  </Typography>
                </HelpMeDecideGrid>
              </Form.Item>
            </Form.Section>

            {/* Selected Product questions section */}
            <Form.Section paddingLeft={0} marginBottom={4}>
              <ProductParser
                answers={answersHashMap}
                components={components}
                onComponentChange={(
                  updatedComponent: GComComponent,
                  index: number,
                  input?: string,
                ) => {
                  if (
                    !answersHashMap[updatedComponent.id] ||
                    answersHashMap[updatedComponent.id] !== input
                  ) {
                    setProductAnswersStates(
                      components,
                      skuAnswers,
                      selectedProduct,
                      index,
                      updatedComponent,
                      input,
                    );
                  }
                }}
              />
              {notEligibleError ? (
                <Box maxWidth={{ xs: '314px', md: '556px' }}>
                  <Alert
                    kind="warning"
                    message={t(
                      'pages:request.gcom.productSelection.notEligible',
                    )}
                    closeable
                    closeButtonAriaLabel={t('common:close')}
                    onClose={() => setNotEligibleError(false)}
                  />
                </Box>
              ) : null}
            </Form.Section>
          </Box>

          {selectedSku && (
            <>
              {/* Selected SKU Inputs section */}
              <Box maxWidth={{ xs: '314px', md: '556px' }}>
                <Form.Section paddingLeft={0}>
                  <ProductParser
                    answers={selectedSkuAnswers[selectedSku.sku]}
                    components={selectedSkuComponents}
                    onComponentChange={(
                      updatedComponent: GComComponent,
                      index: number,
                      input?: string,
                    ) => {
                      setSelectedSkuAnswers({
                        ...selectedSkuAnswers,
                        [selectedSku.sku]: {
                          ...selectedSkuAnswers[selectedSku.sku],
                          [updatedComponent.id]: input,
                        },
                      });
                    }}
                  />
                </Form.Section>
              </Box>

              {/* Selection display section */}
              {selectedSku.sku !== SPECIAL_REQUEST_SKU ? (
                <Form.Section paddingLeft={0}>
                  <SelectedSkuSummary
                    selectedProduct={selectedProduct.label}
                    selectedSku={selectedSku}
                  />
                </Form.Section>
              ) : null}
            </>
          )}
        </Form>
      ) : null}

      <Grid marginTop="33px">
        <Button
          kind="secondary"
          marginRight="20px"
          minWidth="105px"
          onClick={() => {
            setComponents([]);
            setSkuAnswers([]);
            setSelectedSkuComponents([]);
            setSelectedSkuAnswers({});
            setSelectedProduct({ label: '', value: '' });
            setSelectedSku(null);
            updateCurrentStep(StepperAction.Back);
          }}
        >
          {t('common:back')}
        </Button>
        <Button
          disabled={!isValidToProceedToCheckout()}
          kind="primary"
          minWidth="105px"
          onClick={() => {
            if (isValidToProceedToCheckout()) {
              updateCurrentStep(StepperAction.Proceed);
            }
          }}
        >
          {t('common:proceedToCheckout')}
        </Button>
      </Grid>
      <HelpMeDecideModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </Box>
  );
};

export default ProductSelection;
