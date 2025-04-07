import { render } from '@testing-library/react';

import CreateAuction from './create-auction';

describe('CreateAuction', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CreateAuction />);
    expect(baseElement).toBeTruthy();
  });
});
