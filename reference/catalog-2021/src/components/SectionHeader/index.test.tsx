import React from 'react';
import { renderWithRouter } from '../../tests/utils';
import SectionHeader from '.';

describe('SectionHeader', () => {
  // fake data props
  const headerProps = {
    title: 'Test Header',
  };

  it('should match snapshot', () => {
    const { container } = renderWithRouter({
      ui: <SectionHeader {...headerProps} />,
    });
    expect(container).toMatchSnapshot();
  });
  it('should display a title when it is passed in from Header props', () => {
    const { getByText } = renderWithRouter({
      ui: <SectionHeader title={headerProps.title} />,
    });

    const headerTxt = getByText(headerProps.title);
    expect(headerTxt).toBeInTheDocument();
    expect(headerTxt).toHaveTextContent(headerProps.title);
  });
});
