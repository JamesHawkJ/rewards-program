import React from 'react';
import { render } from '@testing-library/react';
import WithSpinner from './index';

describe('WithSpinner', () => {
  const TestComponent = () => <div>Test Component</div>;
  const WrappedComponent = WithSpinner(TestComponent);

  it('should render the spinner when isLoading is true', () => {
    const { getByTestId } = render(<WrappedComponent isLoading={true} />);
    expect(getByTestId('spinner')).toBeInTheDocument();
  });

  it('should render the wrapped component when isLoading is false', () => {
    const { getByText } = render(<WrappedComponent isLoading={false} />);
    expect(getByText('Test Component')).toBeInTheDocument();
  });
});
