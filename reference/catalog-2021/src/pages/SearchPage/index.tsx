import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from '@lumos/core';
import PageTemplate from 'components/PageTemplate';
import { Col, GridLayout, Row } from 'components/GridLayout';
import UserLookup, { SelectedUser } from 'components/UserLookup';

enum SearchBy {
  User = 'user',
  Asset = 'asset',
}

export interface SearchPageProps {}
const SearchPage: React.FC<SearchPageProps> = () => {
  const { t } = useTranslation('search');
  const [searchBy, setSearchBy] = useState(SearchBy.User);

  const options = [
    { label: t('searchBy.criteria.user'), value: SearchBy.User },
    { label: t('searchBy.criteria.asset'), value: SearchBy.Asset },
  ];

  const searchByUser = (user: SelectedUser | null) => {
    if (user) {
      console.log(`Search for user: ${user.userId}`);
    } else {
      console.log('clear search results');
    }
  };

  const renderSearchBox = () => {
    switch (searchBy) {
      case SearchBy.Asset:
        return (
          <Form.Item htmlFor="keywords" label="" padding={0}>
            <Form.SearchBox
              inputId="keywords"
              placeholder={t('keywords.placeholder')}
            />
          </Form.Item>
        );
      default:
        return <UserLookup onSelect={searchByUser} />;
    }
  };

  return (
    <PageTemplate hasBanner title={t('title')} subtitle={t('subtitle')}>
      <GridLayout>
        <Row alignItems="flex-end">
          <Col colspan={{ xxs: 'unset', md: '2' }} />
          <Col colspan={{ xxs: '12', xs: '3', md: '2' }}>
            <Form.Item
              padding={0}
              htmlFor="searchBy"
              label={t('searchBy.label')}
            >
              <Form.Dropdown
                id="searchBy"
                aria-label={t('searchBy.label')}
                options={options}
                defaultOption={options[0]}
                buttonLabel={options[0].label}
                onChange={setSearchBy}
              />
            </Form.Item>
          </Col>
          <Col colspan={{ xxs: '12', xs: '9', md: '6' }}>
            {renderSearchBox()}
          </Col>
        </Row>
      </GridLayout>
    </PageTemplate>
  );
};

export default SearchPage;
