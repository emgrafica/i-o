import React from 'react';
import { Col, GridLayout, Row } from 'components/GridLayout';
import TileComponent from './TileComponent';
import { MobilityResolveHardwareSku_mobilityResolveHardwareSku_components_inputValues as MobilityInputValue } from 'graphql/queries/gqlTypes/MobilityResolveHardwareSku';

export interface TileListProps {
  inputValues: MobilityInputValue[];
  selectedInputId?: string | null;
  onChange: (inputValue: MobilityInputValue) => void;
  isLargeTile?: boolean;
}

/**
 * Tile List
 * @param props
 */
const TileList: React.FC<TileListProps> = ({
  inputValues,
  selectedInputId,
  onChange,
  isLargeTile,
}) => {
  const onTileSelected = (inputValue: MobilityInputValue) => {
    onChange(inputValue);
  };

  return (
    <GridLayout columnGutters={0}>
      <Row>
        {inputValues.map((inputValue: MobilityInputValue, i: number) => {
          return (
            <Col
              key={`${inputValue.id}:${i}`}
              display="column"
              colspan={
                isLargeTile
                  ? {
                      xxs: '12',
                    }
                  : {
                      xxs: '12',
                      md: '3',
                      lg: '4',
                    }
              }
              paddingBottom={3}
            >
              <TileComponent
                isLargeTile={isLargeTile}
                inputValue={inputValue}
                onClick={onTileSelected}
                isSelected={
                  selectedInputId
                    ? Boolean(selectedInputId === inputValue.id)
                    : false
                }
              />
            </Col>
          );
        })}
      </Row>
    </GridLayout>
  );
};

export default TileList;
