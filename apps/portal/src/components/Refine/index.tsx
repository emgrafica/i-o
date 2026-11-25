import React from 'react';
import { Form, Box } from '@lumos/core';
import { Search } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

export interface RefineProps {
  /**
   * String used as label for Refine Box
   */
  label?: string;
  /**
   * String used to refine data
   */
  inputValue: string;
  /**
   * Change event handler for each keystroke
   */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Icon used within refine bar
   * @default <Search />
   */
  icon?: any;
}

/**
 * Refine Bar used to filter data
 */
const Refine: React.FC<RefineProps> = ({
  label = '',
  inputValue,
  onChange,
  icon = <Search />,
}) => {
  const { t } = useTranslation();
  return (
    <Box maxWidth="100%">
      <Form.Item
        htmlFor="refine"
        label={label}
        marginLeft={0}
        marginTop={!label ? '20px' : '0px'}
        marginBottom={0}
        marginRight="-20px"
        padding={0}
      >
        <Form.Input
          icon={icon}
          fontSize="13px"
          id="refine"
          aria-label={t('common:refineSearch')}
          onChange={onChange}
          type="text"
          value={inputValue}
        />
      </Form.Item>
    </Box>
  );
};

export default Refine;
