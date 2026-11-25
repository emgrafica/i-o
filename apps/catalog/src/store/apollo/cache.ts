import { initCache } from './store/states';

export const cache = initCache();

cache.writeData({
  data: {
    tenantId: '11111111-1111-1111-1111-111111111111',
  },
});
