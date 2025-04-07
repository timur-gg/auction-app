import { render } from '@testing-library/react';

import Auction from './auction';

describe('Auction', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Auction />);
    expect(baseElement).toBeTruthy();
  });
});
