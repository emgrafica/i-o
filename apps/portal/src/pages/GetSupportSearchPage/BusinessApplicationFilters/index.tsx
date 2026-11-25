import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from '@lumos/core';
import { GetSupportSearch_businessApplicationSearch } from 'models/types/GetSupportSearch';
import FilterSideSheet from 'components/FilterSideSheet';

interface BusinessApplicationFiltersProps
  extends Pick<GetSupportSearch_businessApplicationSearch, 'businessFilters'> {
  onChange: (filterCategories: any) => void;
  sideSheetVersion?: boolean;
  currentFilter: string;
}

const BusinessApplicationFilters: React.FC<BusinessApplicationFiltersProps> = ({
  businessFilters,
  onChange,
  sideSheetVersion,
  currentFilter,
}) => {
  const { t } = useTranslation('getSupportSearch');
  const [activeFilter, setActiveFilter] = useState('');

  if (!businessFilters) return null;

  const filterList = (
    <Form.RadioGroup
      name="businessFilter"
      headingLabel={sideSheetVersion ? '' : t('businessFiltersLabel')}
      onChange={e => {
        sideSheetVersion
          ? setActiveFilter(e.target.value)
          : onChange(e.target.value);
      }}
      stacked
      marginTop={sideSheetVersion ? '0px' : '25px'}
    >
      <Form.Item
        label={t('viewAllLabel')}
        htmlFor="viewAll"
        inlineLabel
        paddingLeft="0px"
        fontSize="14px"
      >
        <Form.Radiobox
          id="viewAll"
          value=""
          defaultChecked={currentFilter === ''}
        />
      </Form.Item>
      {businessFilters.map(filter => (
        <Form.Item
          key={filter}
          label={filter}
          htmlFor={filter}
          inlineLabel
          paddingLeft="0px"
          fontSize="14px"
        >
          <Form.Radiobox
            id={filter}
            value={filter}
            defaultChecked={currentFilter === filter}
          />
        </Form.Item>
      ))}
    </Form.RadioGroup>
  );

  return sideSheetVersion ? (
    <FilterSideSheet
      filters={filterList}
      onApply={() => onChange(activeFilter)}
    />
  ) : (
    filterList
  );
};

export default BusinessApplicationFilters;
