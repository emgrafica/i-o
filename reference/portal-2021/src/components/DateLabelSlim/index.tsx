import React from 'react';

import { Box, Typography } from '@lumos/core';
import useLocaleDate from '../../utils/useLocaleDate';

/**
 * Props for DateLabel
 */
interface DateLabelProps {
  /** The color of the label */
  color: string;

  /** The text to display on the label */
  label: string;

  /** The date to display */
  date: string | number;
}

/**
 * Display a label (with the given color) and a date.
 * Designed to display the completion date on the header of cards
 * @param props
 */
const DateLabelSlim: React.FC<DateLabelProps> = ({ color, label, date }) => {
  const formattedDate = useLocaleDate(date);

  return (
    <Box>
      <Typography kind="body2" display="inline" color={color} fontWeight="bold">
        {label}
      </Typography>
      <Typography kind="body2" display="inline" ml={1}>
        {formattedDate}
      </Typography>
    </Box>
  );
};
export default DateLabelSlim;
