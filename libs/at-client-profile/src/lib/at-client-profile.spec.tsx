import { render } from '@testing-library/react';

import AtClientProfile from './at-client-profile';

describe('AtClientProfile', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AtClientProfile />);
    expect(baseElement).toBeTruthy();
  });
});
