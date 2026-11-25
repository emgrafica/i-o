import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-common';

/**
 * Providers.
 */
import { LumosTheme, ToastProvider } from '@lumos/core';

/**
 * Components.
 */
import { App } from './components';

/**
 * Containers
 */
import AuthContainer from './containers/AuthContainer';

/**
 * Other.
 */
import * as serviceWorker from './serviceWorker';

/**
 * Configuration.
 */
import 'i18n';
import apolloClient from './store/apollo';
import { env, gtmId } from './utils/env';

/**
 * Google Tag Manager
 * Learn more about react-gtm: https://github.com/alinemorelli/react-gtm
 */
import TagManager, { TagManagerArgs } from 'react-gtm-module';
import lumosTheme from 'utils/lumosTheme';
import GlobalStyle from 'utils/globalStyle';
import WelcomeModal from 'components/WelcomeModal';

const tagManagerArgs: TagManagerArgs = {
  gtmId: env(gtmId),
};

TagManager.initialize(tagManagerArgs);

ReactDOM.render(
  <LumosTheme theme={lumosTheme}>
    <AuthContainer>
      <ApolloProvider client={apolloClient}>
        <ToastProvider placement="top-right" autoDismissTimeout={5000}>
          <GlobalStyle />
          <WelcomeModal />
          <App />
        </ToastProvider>
      </ApolloProvider>
    </AuthContainer>
  </LumosTheme>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
