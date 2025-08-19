import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import store from './core/store';
import { RawAddressModel } from './core/models/address';

global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
        ok: true,
        json: () =>
            Promise.resolve({
                status: 'ok',
                details: [
                    {
                        id: '1',
                        street: 'George Street',
                        city: 'Sydney',
                        houseNumber: '123',
                        firstName: 'John',
                        lastName: 'Doe',
                        postcode: '2000',
                        lat: '1',
                        lon: '1',
                    },
                ] as RawAddressModel[],
            }),
    } as Response)
);

it('address search submits and renders results', async () => {
    render(
        <Provider store={store}>
            <App />
        </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/post code/i), { target: { value: '2000', name: 'postCode' } });
    fireEvent.change(screen.getByPlaceholderText(/house number/i), { target: { value: '1', name: 'houseNumber' } });
    fireEvent.submit(screen.getByTestId('address-form'));

    // loading, then result
    await waitFor(() => expect(screen.getByText(/george street/i)).toBeInTheDocument());
});

it('first name and last name fields are mandatory', async () => {
    render(
        <Provider store={store}>
            <App />
        </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/post code/i), { target: { value: '2000', name: 'postCode' } });
    fireEvent.change(screen.getByPlaceholderText(/house number/i), { target: { value: '1', name: 'houseNumber' } });
    fireEvent.submit(screen.getByTestId('address-form'));

    await waitFor(() => expect(screen.getByText(/george street/i)).toBeInTheDocument());

    fireEvent.click(screen.getByLabelText(/george street/i));
    fireEvent.submit(screen.getByTestId('personal-info-form'));

    // Test 1: should show error
    await waitFor(() => expect(screen.getByText(/First name and last name fields mandatory!/i)).toBeInTheDocument());

    fireEvent.change(screen.getByPlaceholderText(/first name/i), { target: { value: 'John', name: 'firstName' } });
    fireEvent.change(screen.getByPlaceholderText(/last name/i), { target: { value: 'Doe', name: 'lastName' } });
    fireEvent.submit(screen.getByTestId('personal-info-form'));

    // Test 2: should add entry to address book
    await waitFor(() => expect(screen.getByTestId('address-0')).toBeInTheDocument());
});
