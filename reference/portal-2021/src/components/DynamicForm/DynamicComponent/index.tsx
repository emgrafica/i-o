// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Grid, Row } from '@lumos/core';
import BaseComponent from './BaseComponent';
export interface DynamicComponent {
  items: any;
  service: any;
  customeHandler: any;
  updateFormItem: AnyCnameRecord;
  masterFormAction: any;
}

/** Clamp the title for cards*/
const DynamicComponent: React.FC<DynamicComponent> = ({
  items,
  service,
  customeHandler,
  updateFormItem,
  masterFormAction,
}) => {
  const [componentItems, setComponentItems] = useState([]);

  useEffect(() => {
    setComponentItems(items);
  }, [items]);
  return (
    <Grid>
      <Row>
        {componentItems.map((e: any, index: number) => {
          if (!e.hidden) {
            return (
              <BaseComponent
                item={e}
                key={e.key}
                service={service}
                masterFormAction={masterFormAction}
                updateFormItem={updateFormItem}
              />
            );
          } else return <></>;
        })}
      </Row>
    </Grid>
  );
};

export default DynamicComponent;
