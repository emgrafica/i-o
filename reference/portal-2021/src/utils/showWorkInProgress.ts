import { variables, env } from 'utils/env';

/*
  Avoid using `showWorkInProgress` directly, use one of the `showWip*` const instead
  so it's clear why something was considered a WIP.  If none of the `showWip*` serves
  your needs, consider creating a new `showWip* const to identify the new type of WIP
*/
const showWorkInProgress =
  process.env.NODE_ENV === 'test' ||
  env(variables.showWorkInProgress).toLowerCase() === 'true';

// showWip flags for routes

/** Used to show/hide the Mobility Catalog Page until fully developed */
export const showWipMobilityCatalogPage = showWorkInProgress;

/** Used to show/hide the Catalog Communications Page (GCom) until fully developed */
export const showWipCatalogCommunicationsPage = showWorkInProgress;

/** Used to show/hide the Search Page until fully developed  */
export const showWipSearchPage = showWorkInProgress;

/** Used to show/hide the User Preferences page until fully developed  */
export const showWipUserPreferencePage = showWorkInProgress;

// showWip flags for other components

/** Used to show/hide the Searc Action Option Card on the Home page until fully developed */
export const showWipSearchCard = showWorkInProgress;

/** Used to show/hide the sign out functionality until fully developed */
export const showWipSignOut = true;

/** Used to show/hide the Technology section on the Homepage until fully developed */
export const showWipHomePageTechSection = showWorkInProgress;

/** Used to show/hide the ComingSoon messages on the Top Nav until all paths are fully developed */
export const showWipTopNav = showWorkInProgress;

/** Used to show/hide Filterbox in CatalogPage */
export const showWipCatalogFilters = showWorkInProgress;

/** Used to show/hide the Collaboration Page until all paths are fully developed
 * TODO: uncomment this once the live Collaboration Page is completed
 */
// export const showWipCollaborationPage = showWorkInProgress;
