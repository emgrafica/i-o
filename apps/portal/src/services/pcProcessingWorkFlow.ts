import { REST_METHOD, REST_URL } from '../constants';
import requestBoomi from './api-boomi';

const pcProcessingWorkFlow = {
  PcProcessing: async (params: any) => {
    try {
      const requestParams = {
        url: `${REST_URL.BOOMI_PC_LIFECYCLE_REQUEST}`,
        method: `${REST_METHOD.POST}`,
        data: { ...params },
      };

      const response = await requestBoomi(requestParams);
      return response.data;
    } catch (error) {
      console.error('Error', JSON.stringify(error));
      return [];
    }
  },
};

export default pcProcessingWorkFlow;
