import React, { useEffect, useState } from 'react';
import UserLookupForm from './UserLookupForm';

export interface SelectedUser {
  userId: string;
  firstName?: string;
  lastName?: string;
}

export interface UserLookupProps {
  /**
   * Function to call when the user is selected from the typeahead.
   * @param value Selected user.
   */
  onSelect: (user: SelectedUser | null) => void;
  /**
   * Function to call when the lookup criteria changes.
   * @param keyword
   */
  onChange?: (keyword: string) => void;
  /**
   * Label to show above the search box
   * @default '' (empty string)
   */
  label?: string;
  /**
   * value used to decide whether to show the requesting user or not
   * @default '' (empty string)
   */
  includeSelf?: boolean;
  /**
   * value used to decide whether to include functional users
   * @default false
   */
  includeFunctionalUsers?: boolean;
}

/**
 * This component is used to provide the user lookup typeahead ability.
 */
const UserLookup: React.FC<UserLookupProps> = ({
  onSelect,
  onChange,
  label = '',
  includeSelf = true,
  includeFunctionalUsers,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<SelectedUser | null>(null);

  useEffect(() => {
    onSelect(selectedUser);
  }, [selectedUser, onSelect]);

  useEffect(() => {
    if (onChange) {
      onChange(searchTerm);
    }
  }, [searchTerm, onChange]);

  return (
    <UserLookupForm
      searchTerm={searchTerm}
      includeSelf={includeSelf}
      setSearchTerm={setSearchTerm}
      setSelectedUser={setSelectedUser}
      label={label}
      includeFunctionalUsers={includeFunctionalUsers}
    />
  );
};

export default UserLookup;
