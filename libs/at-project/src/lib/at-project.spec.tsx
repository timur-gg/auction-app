import { render } from '@testing-library/react';

import AtProject from './at-project';

describe('AtProject', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AtProject />);
    expect(baseElement).toBeTruthy();
  });
});
