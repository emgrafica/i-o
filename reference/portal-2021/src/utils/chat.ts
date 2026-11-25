import { env, variables } from './env';
import { openInWindow } from './openInWindow';

/**
 * Opens the ServiceNow chat on an external windows.
 * Focus the chat if already open.
 */
export const openChat = () => {
  openInWindow(env(variables.serviceNowChatUrl), { width: 600, height: 800 });
};
