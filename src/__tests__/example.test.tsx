import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

describe('Example Test', () => {
  it('should render a simple element', () => {
    render(<div>Hello, Print Studio 24!</div>);
    expect(screen.getByText('Hello, Print Studio 24!')).toBeInTheDocument();
  });
});
