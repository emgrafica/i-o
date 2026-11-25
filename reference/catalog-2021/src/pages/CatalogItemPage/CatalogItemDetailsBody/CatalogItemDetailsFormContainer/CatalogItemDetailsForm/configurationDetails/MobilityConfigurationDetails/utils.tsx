import {
  MOBILITY_HARDWARE_RESOLVE_SKU,
  MOBILITY_PLANS_RESOLVE_SKU,
} from 'graphql/queries/catalog';
import { SkuAnswer } from 'gqlTypes/globalTypes';
import {
  MobilityResolveHardwareSku_mobilityResolveHardwareSku_components as MobilityComponent,
  MobilityResolveHardwareSku_mobilityResolveHardwareSku_sku as Sku,
} from 'graphql/queries/gqlTypes/MobilityResolveHardwareSku';

/**
 * Return return updated state values
 * @param components - List of question components to be displayed
 * @param skuAnswers - List of question components answers to be displayed
 * @param index - Index of components array being updated
 * @param updatedComponent - Updated component
 * @param input - Input answer value
 */
export const updateComponentsAndAnswers = (
  components: MobilityComponent[],
  skuAnswers: SkuAnswer[],
  index: number,
  updatedComponent?: MobilityComponent,
  inputId?: string,
) => {
  let updatedComponents = [...components];
  let updatedSkuAnswers = [...skuAnswers];

  // If component is already being displayed, remove all components/answers after that
  if (updatedComponents[index]) {
    updatedComponents = updatedComponents.slice(0, index);
    updatedSkuAnswers = updatedSkuAnswers.slice(0, index);
  }

  // Adds updated component and answer to end of each related array
  if (updatedComponent) {
    updatedComponents.push(updatedComponent);
    if (inputId) {
      updatedSkuAnswers.push({ label: updatedComponent.id, input: inputId });
    }
  }

  // Sets states for questions and answers
  return {
    updatedComponents,
    updatedSkuAnswers,
  };
};

/**
 * Return return next components to display and possible selected Sku
 * @param components - List of question components to be displayed
 * @param skuAnswers - List of question components answers to be displayed
 * @param client - Apollo Client
 * @param setHardwareSelectionLoading - Function to set loading state
 * @param setHardwareSelectionError - Function to set selection error
 * @param modelId - model id to search for
 * @param userId - userId to search for
 */
export const fetchNextComponents = async (
  components: MobilityComponent[],
  skuAnswers: SkuAnswer[],
  client: any,
  setHardwareSelectionLoading: Function,
  setHardwareSelectionError: Function,
  modelId: string,
  userId: string,
) => {
  let updatedComponents = [...components];
  let updatedSku: Sku | null = null;

  setHardwareSelectionLoading(true);
  setHardwareSelectionError(false);

  // This query gets called to retrieve the next question component
  await client
    .query({
      query: MOBILITY_HARDWARE_RESOLVE_SKU,
      variables: {
        modelId,
        skuAnswers,
        userId,
      },
      fetchPolicy: 'network-only',
    })
    .then((result: any) => {
      setHardwareSelectionLoading(false);
      if (result && result.data && result.data.mobilityResolveHardwareSku) {
        const { mobilityResolveHardwareSku } = result.data;
        // Adds next question component to questions array
        updatedComponents = updatedComponents.concat(
          mobilityResolveHardwareSku.components,
        );
        updatedSku = mobilityResolveHardwareSku.sku;
      }
    })
    .catch(() => {
      setHardwareSelectionLoading(false);
      setHardwareSelectionError(true);
    });

  // Sets states for questions and answers
  return {
    updatedComponents,
    updatedSku,
  };
};

/**
 * Return return next components to display and possible selected Sku
 * @param components - List of question components to be displayed
 * @param skuAnswers - List of question components answers to be displayed
 * @param client - Apollo Client
 * @param setPlansSelectionLoading - Function to set loading state
 * @param setPlansSelectionError - Function to set selection error
 * @param modelId - model id to search for
 * @param userId - userId to search for
 */
export const fetchPlansNextComponents = async (
  components: MobilityComponent[],
  skuAnswers: SkuAnswer[],
  client: any,
  setPlansSelectionLoading: Function,
  setPlansSelectionError: Function,
  modelId: string,
  skuId: string,
  userId: string,
) => {
  let updatedComponents = [...components];
  let updatedSku: Sku | null = null;

  setPlansSelectionLoading(true);
  setPlansSelectionError(false);

  // This query gets called to retrieve the next question component
  await client
    .query({
      query: MOBILITY_PLANS_RESOLVE_SKU,
      variables: {
        modelId,
        skuId,
        skuAnswers,
        userId,
      },
      fetchPolicy: 'network-only',
    })
    .then((result: any) => {
      setPlansSelectionLoading(false);
      if (result && result.data && result.data.mobilityResolvePlanSku) {
        const { mobilityResolvePlanSku } = result.data;
        // Adds next question component to questions array
        updatedComponents = updatedComponents.concat(
          mobilityResolvePlanSku.components,
        );
        updatedSku = mobilityResolvePlanSku.sku;
      }
    })
    .catch(() => {
      setPlansSelectionLoading(false);
      setPlansSelectionError(true);
    });

  // Sets states for questions and answers
  return {
    updatedComponents,
    updatedSku,
  };
};
