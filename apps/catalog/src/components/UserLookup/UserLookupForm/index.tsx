import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/react-hooks';
import { Form } from '@lumos/core';
import { Group } from '@material-ui/icons';
import { ISearchboxOption } from '@lumos/core/lib/components/Form/SearchBox/types';
import {
  SearchUsers,
  SearchUsers_searchUsers_items,
  SearchUsersVariables,
} from '../queries/gqlTypes/SearchUsers';
import { SEARCH_USERS } from '../queries';
import { StyledNotMatchTypography } from './index.style';
import { SelectedUser } from '../index';

const SCROLL_POINT = 4;

interface UserLookupFormProps {
  searchTerm: string;
  includeSelf?: boolean;
  includeFunctionalUsers?: boolean;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setSelectedUser: React.Dispatch<React.SetStateAction<SelectedUser | null>>;
  /**
   * Label to show above the search box
   * @default '' (empty string)
   */
  label?: string;
}
const UserLookupForm: React.FC<UserLookupFormProps> = ({
  searchTerm,
  includeSelf = true,
  includeFunctionalUsers,
  setSearchTerm,
  setSelectedUser,
  label = '',
}) => {
  const { t } = useTranslation();

  /**
   * Queries
   */
  const { data } = useQuery<SearchUsers, SearchUsersVariables>(SEARCH_USERS, {
    variables: {
      keywords: searchTerm,
      pageSize: 20,
      includeSelf,
      includeFunctionalUsers,
    },
    skip: !searchTerm || searchTerm === '',
  });

  /**
   * Side Effects
   */

  // Clear the selected user when the form is unmounted.
  useEffect(() => {
    return () => {
      setSelectedUser(null);
    };
  }, [setSelectedUser]);

  // Clear the selected user if the key stroke changes
  useEffect(() => {
    setSelectedUser(null);
  }, [setSelectedUser, searchTerm]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleChange = (e: ISearchboxOption | ISearchboxOption[] | null) => {
    if (e) {
      const userId = (e as ISearchboxOption).value;
      const user = data
        ? data.searchUsers.items
            .map(item => ({
              userId: item.userId,
              firstName: item.firstName,
              lastName: item.lastName,
            }))
            .find(item => item.userId === userId) || null
        : null;

      setSelectedUser(user);
    }
  };

  const renderFooter = (data: SearchUsers) =>
    data.searchUsers.totalItems > SCROLL_POINT
      ? `SHOWING ${data.searchUsers.totalItems} RESULTS`
      : undefined;

  return (
    <Form.Item
      htmlFor="lookupUser"
      labelId="lookupUserLabel"
      label={label}
      padding={0}
    >
      <Form.SearchBox
        inputId="lookupUser"
        placeholder={t('userLookup:placeholder')}
        userSelectOnClick
        openOnClick
        onSearch={handleSearch}
        onChange={handleChange}
        icon={<Group />}
      >
        {data && (
          <Form.SearchList
            searchListRows={SCROLL_POINT}
            footerContent={renderFooter(data)}
          >
            {data.searchUsers &&
            data.searchUsers.items &&
            data.searchUsers.items.length > 0 ? (
              data.searchUsers.items.map(
                (item: SearchUsers_searchUsers_items, index) => (
                  <Form.SearchOption
                    label={`${item.firstName} ${item.lastName} (${item.userId})`}
                    value={item.userId}
                    key={item.userId}
                    metaData={{ index }}
                    ellipsis={true}
                  />
                ),
              )
            ) : (
              //TODO: Add option to Lumos Form.SearchList to allow a custom message when there a are not results to display.
              <StyledNotMatchTypography>
                {t('userLookup:noSearchResultLabel')}
              </StyledNotMatchTypography>
            )}
          </Form.SearchList>
        )}
      </Form.SearchBox>
    </Form.Item>
  );
};

export default UserLookupForm;
