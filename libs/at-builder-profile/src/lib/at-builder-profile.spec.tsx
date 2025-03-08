import { render } from '@testing-library/react';

import AtBuilderProfile from './at-builder-profile';

describe('AtBuilderProfile', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AtBuilderProfile />);
    expect(baseElement).toBeTruthy();
  });
});
