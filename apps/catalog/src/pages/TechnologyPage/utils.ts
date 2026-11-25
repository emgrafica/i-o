import { Dispatch } from 'react';
import { useTranslation } from 'react-i18next';
import { ReasonForReturn } from 'gqlTypes/globalTypes';
import { Action, ActionTypes } from './types';

/**
 * It returns the associated translated reason label.
 * @param reason type
 */
export const useReason = (reason: ReasonForReturn): string => {
  const { t } = useTranslation('technology');

  switch (reason) {
    case ReasonForReturn.OwnerInactive:
      return t('return.userLeft');
    case ReasonForReturn.DeviceNotRequired:
      return t('return.notRequired');
    case ReasonForReturn.DeviceBroken:
      return t('return.deviceBroken');
    case ReasonForReturn.Other:
      return t('return.other');
  }

  throw new Error(`reason type (${reason}) is not recognized.`);
};

/**
 * It sets loading to true for the actioned-on asset id
 * then sets to false after a 2 second timeout
 */
export const setAssetLoadingState = (
  dispatch: Dispatch<Action>,
  assetDataId: string,
) => {
  dispatch({
    type: ActionTypes.SET_ASSET_LOADING_STATE,
    payload: { assetDataId, loading: true },
  });
  setTimeout(() => {
    dispatch({
      type: ActionTypes.SET_ASSET_LOADING_STATE,
      payload: { assetDataId, loading: false },
    });
  }, 2000);
};
