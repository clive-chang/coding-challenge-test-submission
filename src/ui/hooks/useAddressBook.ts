import { addAddress, removeAddress, selectAddress, updateAddresses } from '../../core/reducers/addressBookSlice';
import { Address } from '@/types';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../core/store/hooks';

import transformAddress, { RawAddressModel } from '../../core/models/address';
import databaseService from '../../core/services/databaseService';

export default function useAddressBook() {
    const dispatch = useAppDispatch();
    const addresses = useAppSelector(selectAddress);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        if (!loading) {
            databaseService.setItem('addresses', addresses);
        }
    }, [addresses, loading]);

    return {
        /** Add address to the redux store */
        addAddress: (address: Address) => {
            dispatch(addAddress(address));
        },
        /** Remove address by entryID from the redux store */
        removeAddress: (id: string) => {
            dispatch(removeAddress(id));
        },
        /** Loads saved addresses from the indexedDB */
        loadSavedAddresses: async () => {
            const saved: RawAddressModel[] | null = await databaseService.getItem('addresses');
            // No saved item found, exit this function
            if (!saved || !Array.isArray(saved)) {
                setLoading(false);
                return;
            }
            dispatch(updateAddresses(saved.map((address) => transformAddress(address))));
            setLoading(false);
        },
        loading,
    };
}
