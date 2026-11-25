import GCOM_RESOLVE_SKU from 'graphql/queries/gcomResolveSku';
import { SkuAnswer } from 'gqlTypes/globalTypes';
import { GcomItems_gcomItems } from 'graphql/queries/gqlTypes/GcomItems';
import {
  GComResolveSku_gcomResolveSku_components as GComComponent,
  GComResolveSku_gcomResolveSku_components_inputValues as GComDropdownInputValues,
} from 'graphql/queries/gqlTypes/GComResolveSku';
import { ApolloError } from 'apollo-client';

export const SPECIAL_REQUEST_SKU = 'specialRequest';

export const SEARCH_COMPONENT = 'search';
export const DROPDOWN_COMPONENT = 'dropdown';
export const TEXTFIELD_COMPONENT = 'textfield';
export const TEXTAREA_COMPONENT = 'textarea';
const NOT_ENTITLED = 'NOT_ENTITLED';

/**
 * Required shape of dropdown item for <FilterBox />
 */
export interface DropdownOption {
  /**
   * Label of dropdown item
   */
  label: string;
  /**
   * Value saved in state when this dropdown item is selected
   */
  value: string;
}

/**
 * Generates list of options for Form.Dropdown
 * @param productItems - List of product items to be parsed
 */
export const parseProductItemToDropdownOptions = (
  productItems: GcomItems_gcomItems[],
): DropdownOption[] => {
  return productItems.reduce((result: any, productItem) => {
    result.push({
      label: productItem.name,
      value: productItem.code,
    });
    return result;
  }, []);
};

/**
 * Generates list of options for Form.Dropdown
 * @param inputValues - List of product input values to be parsed
 */
export const parseProductAnswerToDropdownOptions = (
  inputValues: GComDropdownInputValues[],
): DropdownOption[] => {
  return inputValues.reduce((result: any, inputValue) => {
    result.push({
      label: inputValue.value,
      value: inputValue.id,
    });
    return result;
  }, []);
};

/**
 * Return selected option from Form.Dropdown
 * @param productOptions - List of product options
 * @param productOptions - List of product items to be parsed
 */
export const getSelectedOption = (
  productOptions: DropdownOption[],
  selectedValue: string,
) =>
  productOptions.find((item: { value: any }) => item.value === selectedValue);

/**
 * Return return updated state values
 * @param components - List of question components to be displayed
 * @param skuAnswers - List of question components answers to be displayed
 * @param index - Index of components array being updated
 * @param updatedComponent - Updated component
 * @param input - Input answer value
 */
export const updateComponentsAndAnswers = (
  components: GComComponent[],
  skuAnswers: SkuAnswer[],
  index: number,
  updatedComponent?: GComComponent,
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
      // TODO: Use updatedComponent.id instead updatedComponent.label when BE is ready
      updatedSkuAnswers.push({ label: updatedComponent.label, input: inputId });
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
 * @param selectedProduct - Selected product option
 * @param setNotEligibleError - Function to set not eligible error
 * @param updatedComponent - Updated component
 */
export const fetchNextComponents = async (
  components: GComComponent[],
  skuAnswers: SkuAnswer[],
  client: any,
  selectedProduct: DropdownOption,
  setNotEligibleError: Function,
  setProductSelectionFollowUpError: Function,
  updatedComponent?: GComComponent,
  inputId?: string,
  assignedToId?: string,
  site?: string | null,
) => {
  let updatedComponents = [...components];
  let updatedSku = null;
  let selectedSkuComponents: GComComponent[] = [];

  // This query gets called to retrieve the next question component
  await client
    .query({
      query: GCOM_RESOLVE_SKU,
      variables: {
        productCode: selectedProduct.value,
        skuAnswers: skuAnswers,
        sku:
          updatedComponent && updatedComponent.componentType === 'search'
            ? inputId
            : null,
        assignedToId: assignedToId,
        site: site,
      },
      fetchPolicy: 'network-only',
    })
    .then((result: any) => {
      if (result && result.data && result.data.gcomResolveSku) {
        const { gcomResolveSku } = result.data;
        if (gcomResolveSku.sku) {
          selectedSkuComponents = gcomResolveSku.components;
        } else {
          // Adds next question component to questions array
          updatedComponents = updatedComponents.concat(
            gcomResolveSku.components,
          );
        }
        updatedSku = gcomResolveSku.sku;
      }
    })
    .catch((error: ApolloError) => {
      error.graphQLErrors.forEach(gqlError => {
        // Render unentitled messaging during product selection if the user is unentitled to the selected product
        if (gqlError.extensions && gqlError.extensions.code === NOT_ENTITLED) {
          setNotEligibleError(true);
        } else {
          setProductSelectionFollowUpError(true);
        }
      });
    });

  // Sets states for questions and answers
  return {
    updatedComponents,
    updatedSku,
    selectedSkuComponents,
  };
};

/**
 * Return hash map between questions and answers
 * @param components - List of question components to be displayed
 * @param skuAnswers - List of question components answers to be displayed
 */
export const createQuestionAnswerMap = (
  components: GComComponent[],
  skuAnswers: SkuAnswer[],
) => {
  return skuAnswers.reduce((result: any, skuAnswer, currentIndex) => {
    return {
      ...result,
      [components[currentIndex] &&
      components[currentIndex].id]: skuAnswer.input,
    };
  }, {});
};
