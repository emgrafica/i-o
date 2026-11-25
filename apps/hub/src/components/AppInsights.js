import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';
import { createBrowserHistory } from 'history';
import { config as envConfig } from '../config';

const browserHistory = createBrowserHistory({ basename: '' });
const reactPlugin = new ReactPlugin();
//console.log(envConfig);
const appInsights = new ApplicationInsights({
    config: {
        instrumentationKey: envConfig.APPINSIGHTS_INSTRUMENTATIONKEY,
        extensions: [reactPlugin],
        extensionConfig: {
          [reactPlugin.identifier]: { history: browserHistory }
        }
    }
});
appInsights.loadAppInsights();
export { reactPlugin, appInsights };