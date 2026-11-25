import React from 'react';
import Helmet from 'react-helmet';

/** Props for PageTitle */
interface PageTitleProps {
  /** Page title (displays in tab) */
  title: string;
}

/** PageTitle is used to set the Page title (what displays in tab) */
const PageTitle: React.FC<PageTitleProps> = ({ title }) => (
  <Helmet>
    <title>{`i-o - ${title}`}</title>
  </Helmet>
);

export default PageTitle;
