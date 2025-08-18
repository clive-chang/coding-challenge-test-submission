import { renderHook, act } from '@testing-library/react';
import { AddressForm } from '@/types';
import { useFormField } from './useFormField';

const initialData: AddressForm = {
    firstName: 'John',
    houseNumber: '123',
    lastName: 'Doe',
    postCode: '2000',
    selectedAddress: '1',
};

it('initialize with given values', () => {
    const { result } = renderHook(() => useFormField(initialData));
    expect(result.current.fieldValues).toEqual(initialData);
});

it('update field through handleFieldChange event', () => {
    const { result } = renderHook(() => useFormField(initialData));

    act(() => {
        const event = {
            target: {
                name: 'firstName',
                value: 'David',
                type: 'text',
            },
        } as React.ChangeEvent<HTMLInputElement>;
        result.current.handleFieldChange(event);
    });

    expect(result.current.fieldValues.firstName).toEqual('David');
});

it('wipe all fields through clear form function', () => {
    const { result } = renderHook(() => useFormField(initialData));
    const hasValues = Object.values(result.current.fieldValues).some((val) => val !== '');
    expect(hasValues).toBe(true);
});
