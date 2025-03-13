import { render } from '@testing-library/react';

import ConfirmProject from './confirm-project';

describe('ConfirmProject', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ConfirmProject />);
    expect(baseElement).toBeTruthy();
  });
});
