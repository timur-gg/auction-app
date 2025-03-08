import { render } from '@testing-library/react';

import AtSignup from './at-signup';

describe('AtSignup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AtSignup />);
    expect(baseElement).toBeTruthy();
  });
});
