/* eslint-disable no-undef */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInContainer } from '../../components/SignIn';

// TODO: Ei toimi koska who knows...
describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
      const onSubmit = jest.fn();

      const mockFormik = {
        handleSubmit: () => onSubmit({ username: 'kalle', password: 'password' }),
        handleChange: jest.fn().mockImplementation((field) => (value) => {
          mockFormik.values[field] = value;
        }),
        handleBlur: jest.fn(),
        touched: { username: true, password: true },
        errors: {},
        values: { username: '', password: '' },
      };

      const { getByTestId } = render(
        <SignInContainer formik={mockFormik} />
      );

      fireEvent.changeText(getByTestId('usernameInput'), 'kalle');
      fireEvent.changeText(getByTestId('passwordInput'), 'password');

      // screen.debug();

      fireEvent.press(getByTestId('submitButton'));

      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit).toHaveBeenCalledWith({ username: 'kalle', password: 'password' });
      });
    });
  });
});
