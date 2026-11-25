import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from '@lumos/core';
import { GComResolveSku_gcomResolveSku_components as GComComponent } from 'graphql/queries/gqlTypes/GComResolveSku';
import {
  parseProductAnswerToDropdownOptions,
  getSelectedOption,
  SEARCH_COMPONENT,
  DROPDOWN_COMPONENT,
  TEXTFIELD_COMPONENT,
  TEXTAREA_COMPONENT,
} from '../../../../utils';
import { IHash } from 'store/Cart';
import OneOptionDropdown from './components/OneOptionDropdown';

/**
 * Props for ProductParser
 */
export interface ProductParserProps {
  answers: IHash;
  components: GComComponent[];
  onComponentChange: (
    updatedComponent: GComComponent,
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

  return (
    <>
      {components.map((component, index) => {
        return (
          <Form.Item
            key={component.key}
            label={component.label}
            htmlFor={component.label}
            required={component.required}
            paddingX={0}
            marginBottom={index !== components.length - 1 ? 4 : 0}
            tooltip={component.tooltip || undefined}
          >
            {component.componentType === DROPDOWN_COMPONENT &&
            component.inputValues.length > 1 ? (
              <Form.Dropdown
                buttonLabel={t('common:select')}
                onChange={e => onComponentChange(component, index, e)}
                options={parseProductAnswerToDropdownOptions(
                  component.inputValues,
                )}
                selectedOption={
                  answers[component.id]
                    ? getSelectedOption(
                        parseProductAnswerToDropdownOptions(
                          component.inputValues,
                        ),
                        answers[component.id],
                      )
                    : null
                }
              />
            ) : component.componentType === DROPDOWN_COMPONENT &&
              component.inputValues.length === 1 ? (
              <OneOptionDropdown
                component={component}
                answers={answers}
                index={index}
                onComponentChange={onComponentChange}
              />
            ) : component.componentType === SEARCH_COMPONENT ? (
              <Form.Input
                id={component.id}
                maxLength={component.maxLength || undefined}
                onChange={e => {
                  onComponentChange(component, index, e.target.value);
                }}
                type="search"
                value={answers[component.id] ? answers[component.id] : null}
              />
            ) : component.componentType === TEXTFIELD_COMPONENT ? (
              <Form.Input
                id={component.id}
                maxLength={component.maxLength || undefined}
                onChange={e => {
                  onComponentChange(component, index, e.target.value);
                }}
                type="text"
                value={answers && answers[component.id]}
              />
            ) : component.componentType === TEXTAREA_COMPONENT ? (
              <Form.TextArea
                id={component.id}
                height="76px"
                maxLength={component.maxLength || undefined}
                maximum={component.maxLength || undefined}
                onChange={e => {
                  onComponentChange(component, index, e.target.value);
                }}
                value={answers && answers[component.id]}
              />
            ) : null}
          </Form.Item>
        );
      })}
    </>
  );
};

export default ProductParser;
