import React from 'react';
import App from './App';

describe('<App />', () => {
  it('should match snapshot', () => {
    expect(<App />).toMatchSnapshot();
  });
});
