import { render } from '@testing-library/react';

import ClientProfile from './client-profile';

describe('ClientProfile', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientProfile />);
    expect(baseElement).toBeTruthy();
  });
});
