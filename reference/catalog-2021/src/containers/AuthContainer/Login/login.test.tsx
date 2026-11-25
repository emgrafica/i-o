import React from 'react';
import { render, fireEvent } from 'tests/utils';
import Login from './index';

describe('Login', () => {
  const login = jest.fn();
  const ui = <Login login={login} />;
  it('should have disabled continue button when no input', () => {
    const { getByText } = render(ui);
    expect(getByText('Continue')).toBeDisabled();
  });
  it('should have disabled continue button when invalid email is input', () => {
    const { getByPlaceholderText, getByText } = render(ui);
    const textInput = getByPlaceholderText(
      'email@email.com',
    ) as HTMLTextAreaElement;
    fireEvent.change(textInput, { target: { value: 'x' } });
    expect(getByText('Continue')).toBeDisabled();
  });
  it('should enable button when valid email is input', () => {
    const { getByPlaceholderText, getByText } = render(ui);
    const textInput = getByPlaceholderText(
      'email@email.com',
    ) as HTMLTextAreaElement;
    fireEvent.change(textInput, { target: { value: 'person@email.com' } });
    expect(getByText('Continue')).not.toBeDisabled();
  });
});
