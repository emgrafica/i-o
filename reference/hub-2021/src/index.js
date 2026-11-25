import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React, { useEffect, useState } from "react";
import { ThemeProvider } from '@emotion/react'
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { BrowserRouter } from "react-router-dom";
import Favicon from 'react-favicon'

import { configureStore, history} from './redux/store/store';
import { theme } from './styles/'
import {ROUTER} from './constants';
import 'antd/dist/antd.css';
import App from './components/App';
import FaviconCustom from 'components/Favicon/FaviconCustom';

const store = configureStore();


ReactDOM.render((
  <div>
    <FaviconCustom/>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Switch>
              <Route path={ROUTER.ROOT} component={App} />
            </Switch>
          </BrowserRouter>
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  </div>

), document.getElementById('root'));
