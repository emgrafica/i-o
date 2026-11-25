import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from '@lumos/core';
import { IDropdownProps } from '@lumos/core/lib/components/Form/Dropdown/Dropdown';

export type IOmitDropdownProps = Omit<IDropdownProps, 'id' | 'buttonLabel'>;

/**
 * DateRangeProps accepts any IDropdownProps props except id and buttonLabel.
 *
 * @param label string to display as label on dropdown box
 * @param selectedOption selected dropdown option
 */
export interface DateRangeProps extends IOmitDropdownProps {
  label?: string;
}

const DateRange: React.FC<DateRangeProps> = ({
  selectedOption,
  label = '',
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <Form.Item
      data-testid={'date-range'}
      htmlFor={t('common:viewing')}
      label={label}
      marginTop="23px"
      marginBottom={3}
      padding={0}
    >
      <Form.Dropdown
        id="viewing"
        buttonLabel={t('common:viewing')}
        selectedOption={selectedOption}
        {...props}
      />
    </Form.Item>
  );
};

export default DateRange;
