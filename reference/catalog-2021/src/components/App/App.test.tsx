import React from 'react';
import { LumosTheme } from '@lumos/core';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';
import { renderWithRouter } from '../../tests/utils';

// Components.
import { SwitchRoutes } from '.';

describe('App', () => {
  it('should fall back to 404 on an uncaught route', () => {
    const { getByText } = renderWithRouter({
      ui: (
        <LumosTheme>
          <I18nextProvider i18n={i18n}>
            <SwitchRoutes setShowFeedback={() => {}} />
          </I18nextProvider>
        </LumosTheme>
      ),
      opts: {
        route: '/does-not-exist',
      },
    });

    expect(getByText('Oops, page not found.')).toBeInTheDocument();
  });
});
