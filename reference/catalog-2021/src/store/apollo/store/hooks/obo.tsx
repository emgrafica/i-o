import { useQuery, useMutation } from '@apollo/react-hooks';
import { OBO_INFO } from '../actions/queries';
import { OboInfo } from '../actions/queries/gqlTypes/OboInfo';
import {
  SubmitOboInfo,
  SubmitOboInfoVariables,
} from '../actions/mutations/gqlTypes/SubmitOboInfo';
import { SUBMIT_OBO_INFO } from '../actions/mutations';
import { OboUser, OboUserRights } from 'gqlTypes/globalTypes';
import {
  OboInfo_oboInfo_user,
  OboInfo_oboInfo_userRights,
  OboInfo_oboInfo,
} from '../actions/queries/gqlTypes/OboInfo';

//-----------------------------------------------------------------------
// This constants should match with the feature codes the backend sends
//-----------------------------------------------------------------------
export const MANAGE_FEATURE_CODE = 'Manage';
export const USER_PROFILE_FEATURE_CODE = 'User-Profile';
export const SHARE_FEEDBACK_FEATURE_CODE = 'Share-Feedback';
export const GET_ASSISTANCE_FEATURE_CODE = 'Get-Assistance';
export const SEARCH_NOW_FEATURE_CODE = 'Search-Now';
export const VIEW_TECHNOLOGY_FEATURE_CODE = 'View-Technology';
export const INCIDENTS_FEATURE_CODE = 'Incidents';
export const APPROVALS_FEATURE_CODE = 'Approvals';
export const ORDERS_FEATURE_CODE = 'Orders';

/**
 * OBOUserInfo class implements OboInfo_oboInfo interface and add new methods.
 */
class OBOUserInfo implements OboInfo_oboInfo {
  __typename: 'OboInfo';
  user: OboInfo_oboInfo_user | null;
  userRights: (OboInfo_oboInfo_userRights | null)[] | null;

  constructor(
    user: OboInfo_oboInfo_user | null,
    userRights: (OboInfo_oboInfo_userRights | null)[] | null,
  ) {
    this.__typename = 'OboInfo';
    this.user = user;
    this.userRights = userRights;
  }

  hasOBOUserRightFor = (userRightToVerify: string) => {
    let hasRight = true;
    if (this.user) {
      hasRight = !!(
        this.userRights &&
        this.userRights.find(
          userRight =>
            userRight &&
            userRight.featureCode === userRightToVerify &&
            userRight.enabled,
        )
      );
    }

    return hasRight;
  };
}

/**
 * Hook to access OBO Info state in Apollo cache.
 */
export const useOBOInfoLocalState = () => {
  const { data } = useQuery<OboInfo>(OBO_INFO);
  const oboInfo = data && data.oboInfo;
  return new OBOUserInfo(
    oboInfo ? oboInfo.user : null,
    oboInfo ? oboInfo.userRights : null,
  );
};

/**
 * Hook to mutate OBO Info state in Apollo cache.
 */
export const useSetOBOInfoLocalState = () => {
  const [submitOboInfo] = useMutation<SubmitOboInfo, SubmitOboInfoVariables>(
    SUBMIT_OBO_INFO,
  );

  return (user: OboUser | null, userRights: OboUserRights[] | null) =>
    submitOboInfo({
      variables: {
        user,
        userRights,
      },
    });
};
