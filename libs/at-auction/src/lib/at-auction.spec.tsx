import { render } from '@testing-library/react';

import AtAuction from './at-auction';

describe('AtAuction', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AtAuction />);
    expect(baseElement).toBeTruthy();
  });
});
