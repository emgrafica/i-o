import { createContext, Context } from 'react';
import { CatalogPageContextType } from 'hooks/useQueryLifecycles';

/**
 * Stores loading and error state in order to expose further down the tree.
 * This gives us flexibility to conditionally render child components based on loading or error states.
 */
export const CatalogPageContext: Context<CatalogPageContextType &
  any> = createContext<CatalogPageContextType & any>({
  loading: false,
  error: undefined,
  handleSetCatalogInfo: () => {},
});
