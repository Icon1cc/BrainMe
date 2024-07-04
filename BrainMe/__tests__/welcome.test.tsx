import React from 'react';
import { render } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Welcome from '../app/welcome';

test('renders Welcome correctly', () => {
  const { getByText, queryAllByPlaceholderText } = render(
    <SafeAreaProvider>
      <Welcome />
    </SafeAreaProvider>
  );

  expect(getByText('BrainMe')).toBeTruthy();
  expect(getByText('Quizz your knowledge, share your wisdom!')).toBeTruthy();
  expect(queryAllByPlaceholderText('winner@email.com')).toBeTruthy();
  expect(queryAllByPlaceholderText('Insert password...')).toBeTruthy();
});