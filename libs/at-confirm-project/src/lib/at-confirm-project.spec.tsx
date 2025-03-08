import { render } from '@testing-library/react';

import AtConfirmProject from './at-confirm-project';

describe('AtConfirmProject', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AtConfirmProject />);
    expect(baseElement).toBeTruthy();
  });
});
