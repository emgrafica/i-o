import { nodeEnv } from '../constants';
import queryString from 'query-string';
import { env, variables } from 'utils/env';

/**
 * Upload files to attach to an incident.
 * @returns an object containing the filesSucceeded and filesFailed arrays
 */
export const attachFilesToIncident = async (
  files: File[],
  incidentId: string,
  tenantDisplayId: string,
  accessToken: string,
) => {
  const baseUrl = env(variables.fileUploaderUrl);

  // Wait for all the responses to resolve, if the response
  // doesn't resolve, we catch the error and resolve it
  // to null. If the Promise.all call itself fails, we catch
  // the error and resolve to an array of nulls with the same
  // length as the files
  let responses = await Promise.all(
    files.map(file => {
      const query = queryString.stringify({
        id: incidentId,
        tenantDisplayId,
      });
      const body = new FormData();
      body.append('file', file);
      return fetch(`${baseUrl}?${query}`, {
        method: 'POST',
        body,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).catch(e => {
        if (env(variables.nodeEnv) !== nodeEnv.production)
          console.error(`File: ${file.name} failed to upload, error: ${e}`);
        return null;
      });
    }),
  ).catch(e => {
    if (env(variables.nodeEnv) !== nodeEnv.production)
      console.error(`All files failed to upload, error: ${e}`);
    return files.map(file => null);
  });

  // split files between successfully uploaded and
  // failed to upload
  const filesSucceeded: File[] = [];
  const filesFailed: File[] = [];
  responses.forEach((response, index) => {
    const file = files[index];
    if (response && response.ok) filesSucceeded.push(file);
    else filesFailed.push(file);
  });
  return { filesSucceeded, filesFailed };
};
