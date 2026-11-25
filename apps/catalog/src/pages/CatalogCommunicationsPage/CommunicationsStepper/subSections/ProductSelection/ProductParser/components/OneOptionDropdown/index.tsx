import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from '@lumos/core';
import { GComResolveSku_gcomResolveSku_components as GComComponent } from 'graphql/queries/gqlTypes/GComResolveSku';
import { IHash } from 'store/Cart';

/**
 * Props for Single Option Dropdown
 */
export interface OneOptionDropdownProps {
  answers: IHash;
  component: GComComponent;
  index: number;
  onComponentChange: (
    updatedComponent: GComComponent,
    index: number,
    input?: string,
  ) => void;
}
const OneOptionDropdown: React.FC<OneOptionDropdownProps> = ({
  answers,
  component,
  index,
  onComponentChange,
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (!answers[component.id]) {
      onComponentChange(component, index, component.inputValues[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form.Dropdown
      buttonLabel={t('common:select')}
      onChange={() => {}}
      options={[]}
      selectedOption={{
        label: component.inputValues[0].value,
        value: component.inputValues[0].value,
      }}
      defaultOption={{
        label: component.inputValues[0].value,
        value: component.inputValues[0].value,
      }}
      disabled
    />
  );
};

export default OneOptionDropdown;
