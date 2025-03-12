import { render } from '@testing-library/react';

import InventoryPage from './inventory.tsx';

describe('AtInventory', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InventoryPage />);
    expect(baseElement).toBeTruthy();
  });
});
