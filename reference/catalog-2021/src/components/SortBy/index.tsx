import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Box } from '@lumos/core';
import { IDropdownProps } from '@lumos/core/lib/components/Form/Dropdown/Dropdown';

export type IOmitDropdownProps = Omit<IDropdownProps, 'id' | 'buttonLabel'>;

/**
 * SortByProps accepts any IDropdownProps props except id and buttonLabel.
 *
 * @param label string to display as label on dropdown box
 * @param selectedOption selectd dropdwon option
 */
export interface SortByProps extends IOmitDropdownProps {
  label?: string;
}

const SortBy: React.FC<SortByProps> = ({
  selectedOption,
  label = '',
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <Box width={200} data-testid={'sort-box'}>
      <Form.Item
        htmlFor={t('common:sortBy')}
        label={label}
        paddingTop={{ lg: '0px' }}
        paddingLeft="0px"
        paddingBottom={{ lg: '12px' }}
      >
        <Form.Dropdown
          buttonLabel={t('common:sortBy')}
          selectedOption={selectedOption}
          padding="8px"
          {...props}
        />
      </Form.Item>
    </Box>
  );
};

export default SortBy;
