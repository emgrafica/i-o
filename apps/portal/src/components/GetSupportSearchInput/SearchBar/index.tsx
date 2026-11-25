import React from 'react';
import { Form } from '@lumos/core';
import { useTranslation } from 'react-i18next';
import { SearchIcon } from './SearchIcon';
/**
 * Props for the SearchBar component
 */
interface SearchBarProps {
  keywords?: string;
  onChange: (keywords: string) => void;
  onSearch: () => void;
}

/**
 * SearchBar for the get support page
 */
const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  keywords,
  onChange,
}) => {
  const { t } = useTranslation();

  return (
    <Form.Input
      borderRadius="2rem"
      autoFocus
      icon={<SearchIcon onClick={() => onSearch()} />}
      id="search"
      placeholder={t('getSupportSearchInput:searchBarPlaceholder')}
      aria-label={t('getSupportSearchInput:searchBar')}
      onChange={e => onChange(e.target.value)}
      onKeyPress={e => {
        if (e.key === 'Enter') onSearch();
      }}
      type="text"
      value={keywords}
    />
  );
};

export default SearchBar;
