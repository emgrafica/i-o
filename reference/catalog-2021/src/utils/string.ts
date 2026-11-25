/**
 * Helper function that returns string or empty string if non existent
 *
 * @param str String you want validated
 */
const getValidString = (str: string | null) => {
  return str || '';
};

export { getValidString };
