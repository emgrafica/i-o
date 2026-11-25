import React from 'react';
import { Grid } from '@lumos/core';
import queryString from 'query-string';
import { GetSupportSearchPath } from 'utils/routes';
import { SubcategoryLabel, Punctuation } from './index.style';
import { subcategorySearchMap } from '../constants';
import { useTranslation } from 'react-i18next';

export interface SubcategoriesProps {
  subcategories: string[];
}

const Subcategories: React.FC<SubcategoriesProps> = ({ subcategories }) => {
  const { t } = useTranslation('getSupport');
  const subcategoriesLength = subcategories.length;

  return (
    <Grid flexDirection="row" flexWrap="wrap">
      {subcategories.map((translationKey, index) => {
        const label = t(translationKey);
        const query = queryString.stringify({
          q: subcategorySearchMap[translationKey],
          language: 'en',
        });
        return (
          <SubcategoryLabel
            key={translationKey}
            to={{ pathname: GetSupportSearchPath, search: query }}
          >
            {label}
            <Punctuation>
              {index === subcategoriesLength - 1 ? '.' : ','}
            </Punctuation>
          </SubcategoryLabel>
        );
      })}
    </Grid>
  );
};

export default Subcategories;
