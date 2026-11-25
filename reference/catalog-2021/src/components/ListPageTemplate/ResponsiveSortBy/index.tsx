import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Button, Popover } from '@lumos/core';
import ShowFor from 'components/ShowFor';
import SortBy from 'components/SortBy';
import { SortByOption } from 'components/ListPageTemplate/types';
import useBreakpoint, { Breakpoint } from 'utils/useBreakpoint';

/** Props for ResponsiveSortBy component */
export interface ResponsiveSortByProps {
  /** Function to trigger when an option is selected */
  handleSetSortBy: (selectedItem: any) => void;
  /** List of options to sort by */
  options: SortByOption[];
  /** Default option that will be selected */
  defaultSortValue: SortByOption;
  /** Selected option from sort by options list */
  selectedOption: any;
}

/**
 * ResponsiveSortBy component will return a dropdown or popup component depending of current breakpoint.
 *
 * @param handleSetSortBy function to trigger when an option is selected
 * @param options list of options to sort by
 * @param defaultSortValue default option that will be selected
 * @param selectedOption selected option from sort by options list
 */
const ResponsiveSortBy: React.FC<ResponsiveSortByProps> = ({
  handleSetSortBy,
  options,
  defaultSortValue,
  selectedOption,
}) => {
  const { t } = useTranslation('common');
  const breakpoint = useBreakpoint();

  return (
    <>
      <ShowFor desktopAndLarger>
        <SortBy
          label={breakpoint !== Breakpoint.md ? t('sortBy') : undefined}
          onChange={handleSetSortBy}
          options={options}
          defaultOption={defaultSortValue}
          selectedOption={selectedOption}
        />
      </ShowFor>
      <ShowFor tabletAndSmaller>
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
                    handleSetSortBy(option.value);
                  }}
                >
                  {option.label}
                </Button>
              ))}
            </Grid>
          }
          placement="bottom"
          trigger="click"
          id="sortByMobile"
        >
          <Button
            kind="text"
            paddingX={{ xxs: '0px', xs: '12px' }}
            data-testid={'sort-box'}
          >
            {t('sort')}
          </Button>
        </Popover>
      </ShowFor>
    </>
  );
};

export default ResponsiveSortBy;
