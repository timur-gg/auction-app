import { render } from '@testing-library/react';

import AtCreateAuction from './at-create-auction';

describe('AtCreateAuction', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AtCreateAuction />);
    expect(baseElement).toBeTruthy();
  });
});
