import { Address } from '@/types';
import reducer, { CounterState, addAddress, removeAddress } from './addressBookSlice';

const mockAddress: Address = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    houseNumber: '123',
    city: 'Sydney',
    postcode: '2000',
    street: 'George Street',
};

it('should add an address', () => {
    const state: CounterState = { addresses: [] };
    const newState = reducer(state, addAddress(mockAddress));
    expect(newState.addresses).toHaveLength(1);
    expect(newState.addresses[0]).toEqual(mockAddress);
});

it('prevents duplicates by composite id', () => {
    const dupAddress = {...mockAddress, id: "2"};
    const state: CounterState = { addresses: [mockAddress] };
    const newState = reducer(state, addAddress(dupAddress));
    expect(newState.addresses).toHaveLength(1);
});

it('should remove an address by entryId', () => {
    const mockAddress1 = {...mockAddress, id: '1', firstName: 'John', entryId: "uid1"};
    const mockAddress2 = {...mockAddress, id: '1', firstName: 'Jane', entryId: "uid2"};
    const state: CounterState = { addresses: [mockAddress1, mockAddress2] };
    const newState = reducer(state, removeAddress("uid2")); //removing mockAddress2
    expect(newState.addresses).toHaveLength(1);
    expect(newState.addresses.find(a => a.entryId === 'uid2')).toBeUndefined();
    expect(newState.addresses[0].entryId).toBe("uid1");
});