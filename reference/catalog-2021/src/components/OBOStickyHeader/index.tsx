import React from 'react';
import StickyHeader from 'components/StickyHeader';
import OBOHeader from './OBOHeader';
import { OboInfo_oboInfo_user } from 'store/apollo/store/actions/queries/gqlTypes/OboInfo';

/**
 * OBO Sticky Header Props
 */
interface OBOStickyHeaderProps {
  oboUser: OboInfo_oboInfo_user;
}
/**
 * OBO Sticky Header Component
 *
 */
const OBOStickyHeader: React.FC<OBOStickyHeaderProps> = props => {
  const { oboUser } = props;
  return (
    <StickyHeader>
      <OBOHeader oboUser={oboUser} />
    </StickyHeader>
  );
};

export default OBOStickyHeader;
