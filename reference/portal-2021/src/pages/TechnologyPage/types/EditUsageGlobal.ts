/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UsageType } from '../../../models/globalTypes';

// ====================================================
// GraphQL query operation: EditUsageGlobal
// ====================================================

export interface EditUsageGlobal_editUsageGlobal_usageTypes {
  __typename: 'UsageOption';
  label: string;
  value: UsageType;
}

export interface EditUsageGlobal_editUsageGlobal {
  __typename: 'EditUsageGlobal';
  usageTypes: EditUsageGlobal_editUsageGlobal_usageTypes[];
}

export interface EditUsageGlobal {
  editUsageGlobal: EditUsageGlobal_editUsageGlobal;
}
