import { RawAddressModel } from "src/core/models/address";

export interface Address {
    city: string;
    firstName: string;
    houseNumber: string;
    id: string;
    lastName: string;
    postcode: string;
    street: string;
    entryId?: string;
}

export interface AddressResponse {
    status: string;
    details?: RawAddressModel[];
    errormessage?: string;
}
