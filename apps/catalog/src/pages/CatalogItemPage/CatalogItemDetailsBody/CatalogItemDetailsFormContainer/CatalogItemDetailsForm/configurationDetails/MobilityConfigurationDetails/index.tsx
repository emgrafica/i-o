import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useApolloClient } from '@apollo/react-hooks';
import { CatalogItemClass, SkuAnswer } from 'gqlTypes/globalTypes';
import { Form, Typography } from '@lumos/core';
import { useUserId } from 'containers/AuthContainer/AuthContext';
import { useOBOInfoLocalState } from 'store/apollo/store/hooks';
import { HandleFunctionalFormStateUpdateArgs } from '../../..';
import { selectConfigurationMap } from '../../../../../utils';
import QueryErrorAlert from 'components/QueryErrorAlert';
import ProductParser from './components/ProductParser';
import {
  MobilityResolveHardwareSku_mobilityResolveHardwareSku_components as MobilityComponent,
  MobilityResolveHardwareSku_mobilityResolveHardwareSku_sku as Sku,
} from 'graphql/queries/gqlTypes/MobilityResolveHardwareSku';
import {
  MobilityResolvePlanSku_mobilityResolvePlanSku_components as MobilityPlanComponent,
  MobilityResolvePlanSku_mobilityResolvePlanSku_sku_features as SkuFeature,
} from 'graphql/queries/gqlTypes/MobilityResolvePlanSku';
import {
  updateComponentsAndAnswers,
  fetchNextComponents,
  fetchPlansNextComponents,
} from './utils';
import { createQuestionAnswerMap } from '../../../../../utils';
import SkeletonsOverlay from './components/SkeletonsOverlay';
import FeaturesComponent from './components/FeaturesComponent';
import { ConfigurationState } from '../../../../../utils';

interface MobilityConfigurationDetailsProps {
  /**
   * catalogItemClass to be loaded
   */
  catalogItemClass: CatalogItemClass;
  /**
   * Updates ComputerDetailsForm form state
   */
  handleFunctionalFormStateUpdate: (
    args: HandleFunctionalFormStateUpdateArgs,
  ) => void;
  /**
   * modelId of current catalog item
   */
  modelId: string | null;

  configurationState: ConfigurationState;
}

/**
 * Allows user to configure catalog item details prior to checkout
 * @param props
 */
const MobilityConfigurationDetails: React.FC<MobilityConfigurationDetailsProps> = ({
  catalogItemClass,
  handleFunctionalFormStateUpdate,
  modelId,
  configurationState,
}) => {
  const { t } = useTranslation();
  const client = useApolloClient();

  const oboInfoLocalState = useOBOInfoLocalState();
  const oboUser = oboInfoLocalState && oboInfoLocalState.user;
  const userId = useUserId();
  const currentUserId = oboUser ? oboUser.userId : userId;

  const {
    selectedSku: selectedHardwareSku,
    hardwareConfiguration,
    selectedPlanSku,
    planConfiguration,
  } = configurationState;

  const hardwareComponents =
    hardwareConfiguration && hardwareConfiguration.components
      ? hardwareConfiguration.components
      : [];
  const hardwareSkuAnswers =
    hardwareConfiguration && hardwareConfiguration.skuAnswers
      ? hardwareConfiguration.skuAnswers
      : [];

  const planComponents =
    planConfiguration && planConfiguration.components
      ? planConfiguration.components
      : [];
  const planSkuAnswers =
    planConfiguration && planConfiguration.skuAnswers
      ? planConfiguration.skuAnswers
      : [];
  const selectedFeatures =
    planConfiguration && planConfiguration.selectedFeatures
      ? planConfiguration.selectedFeatures
      : [];

  const hardwareAnswerMap = createQuestionAnswerMap(
    hardwareComponents,
    hardwareSkuAnswers,
  );
  const planAnswerMap = createQuestionAnswerMap(planComponents, planSkuAnswers);

  useEffect(() => {
    fetchSkuQuestions([], []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    selectedHardwareSku && fetchPlanSkuQuestions([], []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedHardwareSku]);

  const [hardwareSelectionLoading, setHardwareSelectionLoading] = useState(
    false,
  );
  const [planSelectionLoading, setPlanSelectionLoading] = useState(false);
  const [hardwareSelectionError, setHardwareSelectionError] = useState(false);
  const [planSelectionError, setPlanSelectionError] = useState(false);

  const setHardwareConfigurationState = (
    selectedSku: Sku | null,
    skuAnswers: SkuAnswer[],
    components: MobilityComponent[],
  ) => {
    handleFunctionalFormStateUpdate({
      newState: {
        selectedSku: selectedSku
          ? {
              skuId: selectedSku.sku,
              pricing: selectedSku.price,
            }
          : null,
        hardwareConfiguration: {
          skuAnswers,
          components,
        },
        selectedPlanSku: null,
        planConfiguration: null,
      },
    });
  };

  const setPlanConfigurationState = (
    selectedSku: Sku | null,
    skuAnswers: SkuAnswer[],
    components: MobilityComponent[],
  ) => {
    handleFunctionalFormStateUpdate({
      newState: {
        selectedPlanSku: selectedSku,
        planConfiguration: {
          skuAnswers,
          components,
        },
      },
    });
  };

  const setFeaturesConfigurationState = (selectedFeatures: SkuFeature[]) => {
    handleFunctionalFormStateUpdate({
      newState: {
        planConfiguration: {
          ...planConfiguration,
          selectedFeatures,
        },
      },
    });
  };

  const fetchSkuQuestions = async (
    newComponents: MobilityComponent[],
    newSkuAnswers: SkuAnswer[],
  ) => {
    if (currentUserId && modelId) {
      const nextComponents: {
        updatedComponents: MobilityComponent[];
        updatedSku: Sku | null;
      } = await fetchNextComponents(
        newComponents,
        newSkuAnswers,
        client,
        setHardwareSelectionLoading,
        setHardwareSelectionError,
        modelId,
        currentUserId,
      );

      const { updatedComponents, updatedSku } = nextComponents;

      // Sets states for questions and answers
      setHardwareConfigurationState(
        updatedSku,
        newSkuAnswers,
        updatedComponents,
      );
    }
  };

  const fetchPlanSkuQuestions = async (
    newComponents: MobilityPlanComponent[],
    newSkuAnswers: SkuAnswer[],
  ) => {
    if (currentUserId && selectedHardwareSku && modelId) {
      const nextComponents: {
        updatedComponents: MobilityComponent[];
        updatedSku: Sku | null;
      } = await fetchPlansNextComponents(
        newComponents,
        newSkuAnswers,
        client,
        setPlanSelectionLoading,
        setPlanSelectionError,
        modelId,
        selectedHardwareSku.skuId,
        currentUserId,
      );

      const { updatedComponents, updatedSku } = nextComponents;

      // Sets states for Plans questions and answers
      setPlanConfigurationState(updatedSku, newSkuAnswers, updatedComponents);
    }
  };

  const setProductAnswersStates = async (
    index: number,
    updatedComponent: MobilityComponent,
    input?: string,
  ) => {
    // Update components and answers states with new selection
    const updatedComponentsAnswers = updateComponentsAndAnswers(
      hardwareComponents,
      hardwareSkuAnswers,
      index,
      updatedComponent,
      input,
    );

    setHardwareConfigurationState(
      null,
      updatedComponentsAnswers.updatedSkuAnswers,
      updatedComponentsAnswers.updatedComponents,
    );

    fetchSkuQuestions(
      updatedComponentsAnswers.updatedComponents,
      updatedComponentsAnswers.updatedSkuAnswers,
    );
  };

  const setPlansAnswersStates = async (
    index: number,
    updatedComponent?: MobilityPlanComponent,
    input?: string,
  ) => {
    // Update components and answers states with new selection
    const updatedComponentsAnswers = updateComponentsAndAnswers(
      planComponents,
      planSkuAnswers,
      index,
      updatedComponent,
      input,
    );

    // Set answers selected to reflect them inmediatly
    setPlanConfigurationState(
      null,
      updatedComponentsAnswers.updatedSkuAnswers,
      updatedComponentsAnswers.updatedComponents,
    );

    fetchPlanSkuQuestions(
      updatedComponentsAnswers.updatedComponents,
      updatedComponentsAnswers.updatedSkuAnswers,
    );
  };

  const setSelectedFeaturesState = (skuFeature: SkuFeature) => {
    let updatedSelectedFeatures = selectedFeatures ? [...selectedFeatures] : [];
    const index = updatedSelectedFeatures.indexOf(skuFeature);

    if (index > -1) {
      updatedSelectedFeatures.splice(index, 1);
    } else {
      updatedSelectedFeatures.push(skuFeature);
    }

    setFeaturesConfigurationState(updatedSelectedFeatures);
  };

  return (
    <>
      <Typography
        kind="h5"
        color="primary.2"
        marginTop="6.4px"
        paddingTop={0}
        marginBottom={2}
        paddingBottom={0}
      >
        {t(selectConfigurationMap[catalogItemClass])}
      </Typography>
      {/* Hardware Section */}
      <Form.Section paddingLeft={0} marginBottom={4}>
        {hardwareSelectionError ? (
          // TODO: Temporal Error handling until final implementation come on coming sprints
          <QueryErrorAlert
            errorMessage={t(
              'pages:request.mobility.mobilityDetails.hardwareSelectionQueryError',
            )}
            retryClickHandler={() => {}}
          />
        ) : (
          <SkeletonsOverlay
            isLoading={hardwareSelectionLoading && !selectedHardwareSku}
            minHeight="200px"
          >
            <ProductParser
              answers={hardwareAnswerMap}
              components={hardwareComponents}
              onComponentChange={(
                updatedComponent: MobilityComponent,
                index: number,
                input?: string,
              ) => {
                if (
                  !hardwareAnswerMap[updatedComponent.id] ||
                  hardwareAnswerMap[updatedComponent.id] !== input
                ) {
                  setProductAnswersStates(index, updatedComponent, input);
                }
              }}
            />
          </SkeletonsOverlay>
        )}
      </Form.Section>

      {/* Plans Section */}
      {selectedHardwareSku ? (
        <Form.Section paddingLeft={0} marginBottom={4}>
          {planSelectionError ? (
            // TODO: Temporal Error handling until final implementation come on coming sprints
            <QueryErrorAlert
              errorMessage={t(
                'pages:request.mobility.mobilityDetails.hardwareSelectionQueryError',
              )}
              retryClickHandler={() => {}}
            />
          ) : (
            <SkeletonsOverlay
              isLoading={planSelectionLoading && !selectedPlanSku}
              minHeight="100px"
            >
              <>
                <ProductParser
                  answers={planAnswerMap}
                  components={planComponents}
                  onComponentChange={(
                    updatedComponent: MobilityPlanComponent,
                    index: number,
                    input?: string,
                  ) => {
                    if (
                      !planAnswerMap[updatedComponent.id] ||
                      planAnswerMap[updatedComponent.id] !== input
                    ) {
                      setPlansAnswersStates(index, updatedComponent, input);
                    }
                  }}
                />
                {selectedPlanSku && selectedPlanSku.features && (
                  <FeaturesComponent
                    features={selectedPlanSku.features}
                    selectedFeatures={selectedFeatures || []}
                    onChange={setSelectedFeaturesState}
                  />
                )}
              </>
            </SkeletonsOverlay>
          )}
        </Form.Section>
      ) : null}
    </>
  );
};

export default MobilityConfigurationDetails;
