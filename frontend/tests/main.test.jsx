import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App';

test('renders the App component without crashing', () => {
  render(<App />);
});
