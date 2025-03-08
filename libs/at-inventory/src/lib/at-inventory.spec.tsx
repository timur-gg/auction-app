import { render } from '@testing-library/react';

import AtInventory from './at-inventory';

describe('AtInventory', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AtInventory />);
    expect(baseElement).toBeTruthy();
  });
});
