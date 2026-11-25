/**
 * Utility function to redirect to an external page
 * @example
 *<Route
      path={PcSetupPath}
      component={redirectTo(
        'https://example.com',
      )}
    />
 */
export default (url: string) => {
  return () => {
    window.location.href = url;
    return null;
  };
};
