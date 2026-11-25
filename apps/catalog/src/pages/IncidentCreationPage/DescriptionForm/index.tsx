import React from 'react';
import { Form, Grid } from '@lumos/core';
import { useTranslation } from 'react-i18next';
import SectionHeader from 'components/SectionHeader';

interface DescriptionFormProps {
  /**
   * Title input
   */
  title: string;
  /**
   * setState action that sets the Title input
   */
  onTitleChange: (title: string) => void;
  /**
   * details input initialized with questionnaire if applicable
   */
  details: string;
  /**
   * setState action that sets the details input
   */
  onDetailsChange: (description: string) => void;
  /**
   * Determines whether or not to show title field
   */
  showTitleField?: boolean;
}
/**
 * Get Support Incident Page
 */
const DescriptionForm: React.FC<DescriptionFormProps> = props => {
  const { t } = useTranslation('incident');
  const MAX_CHARACTERS = 2500;

  return (
    <Grid flexDirection="column" marginTop="48px">
      <SectionHeader title={t('descriptionSection.header')} />
      {props.showTitleField && (
        <Form.Item
          required
          htmlFor="title"
          label={t('descriptionSection.title.label')}
          padding="0"
          marginBottom="8px"
        >
          <Form.Input
            id="title"
            name="title"
            value={props.title}
            onChange={event => {
              const value = event.currentTarget.value;
              props.onTitleChange(value);
            }}
            placeholder={t('descriptionSection.title.placeholder')}
            type="text"
          />
        </Form.Item>
      )}

      <Form.Item
        required
        htmlFor="details"
        label={t('descriptionSection.details.label')}
        padding="0"
      >
        <Form.TextArea
          minHeight="100px"
          id="details"
          name="details"
          value={props.details}
          maximum={MAX_CHARACTERS}
          maxLength={MAX_CHARACTERS}
          onChange={event => {
            const value = event.currentTarget.value;
            props.onDetailsChange(value);
          }}
          placeholder={t('descriptionSection.details.placeholder')}
        />
      </Form.Item>
    </Grid>
  );
};

export default DescriptionForm;
