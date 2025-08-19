import { render, screen } from '@testing-library/react';
import Button from './Button';

it('render buttons with correct variants and themes', () => {
    render(<Button variant="primary">Primary button</Button>);
    render(<Button variant="secondary" theme='dark'>Secondary button</Button>);

    expect(screen.getByText(/primary button/i)).toHaveClass('primary');
    expect(screen.getByText(/secondary button/i)).toHaveClass('secondary');
    expect(screen.getByText(/secondary button/i)).toHaveClass('dark');
});
