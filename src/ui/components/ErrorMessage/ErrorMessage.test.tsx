import { render, screen } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

it('renders the component with message', async () => {
    render(<ErrorMessage error="This is an error message" />);

    expect(screen.getByText(/This is an error message/i)).toBeInTheDocument();
});

it("doesn't render when message is empty", () => {
    const { container } = render(<ErrorMessage error="" />);
    expect(container).toBeEmptyDOMElement();
});
