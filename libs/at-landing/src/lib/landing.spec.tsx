import { render } from '@testing-library/react';

import LandingPage from './landing.tsx';

describe('AtLanding', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LandingPage />);
    expect(baseElement).toBeTruthy();
  });
});
