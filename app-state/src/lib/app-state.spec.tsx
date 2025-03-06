import { render } from '@testing-library/react';

import AppState from './app-state';

describe('AppState', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AppState />);
    expect(baseElement).toBeTruthy();
  });
});
