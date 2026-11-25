import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Button, Popover } from '@lumos/core';
import ShowFor from 'components/ShowFor';
import { DateRangeOption } from 'components/ListPageTemplate/types';
import useBreakpoint, { Breakpoint } from 'utils/useBreakpoint';
import DateRange from 'components/DateRange';

/** Props for ResponsiveDateRange component */
export interface ResponsiveDateRangeProps {
  /** Function to trigger when an option is selected */
  handleDateRange: (selectedItem: any) => void;
  /** List of options to date range */
  options: DateRangeOption[];
  /** Default option that will be selected */
  defaultDateRangeValue: DateRangeOption;
  /** Selected option from date range options list */
  selectedOption: any;
}

/**
 * ResponsiveDateRange component will return a dropdown or popup component depending of current breakpoint.
 *
 * @param handleDateRange function to trigger when an option is selected
 * @param options list of options to date range
 * @param defaultDateRangeValue default option that will be selected
 * @param selectedOption selected option from date range options list
 */
const ResponsiveDateRange: React.FC<ResponsiveDateRangeProps> = ({
  handleDateRange,
  options,
  defaultDateRangeValue,
  selectedOption,
}) => {
  const { t } = useTranslation('common');
  const breakpoint = useBreakpoint();

  return (
    <>
      {/* <ShowFor desktopAndLarger>
        <DateRange
          label={breakpoint !== Breakpoint.md ? t('viewing') : undefined}
          onChange={handleDateRange}
          options={options}
          defaultOption={defaultDateRangeValue}
          selectedOption={selectedOption}
          marginTop={{ md: '0px' }}
          marginBottom={{ md: '-4px' }}
          marginX={{ md: '0px' }}
          width={{ md: '200px', lg: '100%' }}
        />
      </ShowFor> */}
      <ShowFor mobile tabletAndLarger>
        <Popover
          content={
            <Grid flexDirection="column" margin="16px">
              {options.map(option => (
                <Button
                  key={option.value}
                  kind="text"
                  width="100%"
                  margin={0}
                  textAlign="left"
                  onClick={() => {
                    document.body.click();
                    handleDateRange(option.value);
                  }}
                >
                  {option.label}
                </Button>
              ))}
            </Grid>
          }
          placement="bottom"
          trigger="click"
          id="dateRangeMobile"
        >
          <Button
            kind="text"
            marginLeft={0}
            paddingX="12px"
            data-testid={'date-range'}
          >
            {t('viewing')}
          </Button>
        </Popover>
      </ShowFor>
    </>
  );
};

export default ResponsiveDateRange;
