import { render } from '@testing-library/react';
import BuilderProfile from './builder-profile';

describe('BuilderProfile', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BuilderProfile />);
    expect(baseElement).toBeTruthy();
  });
});
