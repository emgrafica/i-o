import React from 'react';
import { useTranslation } from 'react-i18next';
import { MobilityResolveHardwareSku_mobilityResolveHardwareSku_components as MobilityComponent } from 'graphql/queries/gqlTypes/MobilityResolveHardwareSku';
import { MobilityResolvePlanSku_mobilityResolvePlanSku_components as MobilityPlanComponent } from 'graphql/queries/gqlTypes/MobilityResolvePlanSku';
import { IHash } from 'store/Cart';
import { getTitle } from '../../../../../../../utils';
import DetailComponent from '../DetailComponent';

/**
 * Props for ProductParser
 */
export interface ProductParserProps {
  answers: IHash;
  components: MobilityComponent[] | MobilityPlanComponent[];
  onComponentChange: (
    updatedComponent: MobilityComponent | MobilityPlanComponent,
    index: number,
    input?: string,
  ) => void;
}

/**
 * Product parser component
 */
const ProductParser: React.FC<ProductParserProps> = ({
  answers,
  components,
  onComponentChange,
}) => {
  const { t } = useTranslation();

  const parsedComponent = components.map((component, index) => {
    switch (component.componentType) {
      case 'tile':
        return (
          <DetailComponent
            key={component.key}
            title={t(getTitle(component.id))}
            inputValues={component.inputValues}
            selectedInputId={
              answers[component.id] ? answers[component.id] : null
            }
            onChange={inputValue =>
              onComponentChange(component, index, inputValue.id)
            }
            isRequired
          />
        );

      case 'largeTile':
        return (
          <DetailComponent
            key={component.key}
            title={t(getTitle(component.id))}
            inputValues={component.inputValues}
            selectedInputId={
              answers[component.id] ? answers[component.id] : null
            }
            onChange={inputValue =>
              onComponentChange(component, index, inputValue.id)
            }
            isLargeTile
            isRequired
          />
        );

      default:
        return null;
    }
  });

  return <>{parsedComponent}</>;
};

export default ProductParser;
