import { REST_METHOD, REST_URL } from './restConstants';

import { KNOWLEDGE } from './knowledgeConstants';

import { AUTH } from './authConstants';

import { PC_REF_STATUS } from './pcRefreshConstants';

import { LANGUAGE } from './languageConstants';

import { CHAT_WIDGE } from './chatWidgeConstants';

import { PC_PROCESSING } from './pcProcessingWorkFlowConstants';

import { YOUR_GEAR } from './yourGearConstants';

/**
 * Global app constants. We should try our best to not
 * overload this file.
 */

// App max width in pixels.
export const APP_MAX_WIDTH = 1440;

// TopNav height in pixels.
export const TOP_NAV_HEIGHT = 84;

// Sticky Header height in pixels.
export const STICKY_HEADER_HEIGHT = 80;

// Mobile Sticky Header height in pixels.
export const MOBILE_STICKY_HEADER_HEIGHT = 124;

export const nodeEnv = {
  test: 'test',
  development: 'development',
  production: 'production',
};

export {
  KNOWLEDGE,
  REST_URL,
  REST_METHOD,
  AUTH,
  PC_REF_STATUS,
  LANGUAGE,
  CHAT_WIDGE,
  PC_PROCESSING,
  YOUR_GEAR,
};
