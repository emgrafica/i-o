import { useState, useEffect } from 'react';
import { hasRole } from './mTAuthToken';

/**
 * Checks that the user has the impersonation role available to activate
 * the impersonation feature
 */
export function useCanImpersonate(): boolean {
  const [canImpersonate, setCanImpersonate] = useState(false);

  useEffect(() => {
    hasRole('io_impersonator')
      .then(setCanImpersonate)
      .catch(() => setCanImpersonate(false));
  }, [setCanImpersonate]);

  return canImpersonate;
}
