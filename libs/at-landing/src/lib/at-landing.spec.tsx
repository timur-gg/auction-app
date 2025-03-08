import { render } from '@testing-library/react';

import AtLanding from './at-landing';

describe('AtLanding', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AtLanding />);
    expect(baseElement).toBeTruthy();
  });
});
