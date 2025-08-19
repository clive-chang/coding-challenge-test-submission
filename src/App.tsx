import { useState, ChangeEvent } from 'react';

import Address from '@/components/Address/Address';
import AddressBook from '@/components/AddressBook/AddressBook';
import Button from '@/components/Button/Button';
import Radio from '@/components/Radio/Radio';
import Section from '@/components/Section/Section';
import useAddressBook from '@/hooks/useAddressBook';

import { Address as AddressType, AddressResponse, AddressForm } from './types';
import { useFormField } from '@/hooks/useFormField';
import transformAddress from './core/models/address';
import Form from '@/components/Form/Form';

function App() {
    /**
     * Form fields states
     * TODO: Write a custom hook to set form fields in a more generic way:
     * - Hook must expose an onChange handler to be used by all <InputText /> and <Radio /> components
     * - Hook must expose all text form field values, like so: { postCode: '', houseNumber: '', ...etc }
     * - Remove all individual React.useState
     * - Remove all individual onChange handlers, like handlePostCodeChange for example
     */

    /**
     * Form field states
     */

    const {
        fieldValues: { postCode, houseNumber, firstName, lastName, selectedAddress },
        handleFieldChange,
        clearForm,
    } = useFormField<AddressForm>({
        postCode: '',
        houseNumber: '',
        firstName: '',
        lastName: '',
        selectedAddress: '',
    });

    /**
     * Results states
     */
    const [addressError, setAddressError] = useState<undefined | string>(undefined);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<undefined | string>(undefined);
    const [addresses, setAddresses] = useState<AddressType[]>([]);

    /**
     * Redux actions
     */
    const { addAddress } = useAddressBook();

    /**
     * Form handlers
     */

    /** TODO: Fetch addresses based on houseNumber and postCode using the local BE api
     * - Example URL of API: ${process.env.NEXT_PUBLIC_URL}/api/getAddresses?postcode=1345&streetnumber=350
     * - Ensure you provide a BASE URL for api endpoint for grading purposes!
     * - Handle errors if they occur
     * - Handle successful response by updating the `addresses` in the state using `setAddresses`
     * - Make sure to add the houseNumber to each found address in the response using `transformAddress()` function
     * - Ensure to clear previous search results on each click
     * - Bonus: Add a loading state in the UI while fetching addresses
     */
    const handleAddressSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setAddresses([]);
        setLoading(true);

        if (!postCode || !houseNumber) {
            setAddressError('Please enter a valid postcode and house number');
            setLoading(false);
            return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getAddresses?postcode=${postCode}&streetnumber=${houseNumber}`);
        if (response.ok) {
            const data = (await response.json()) as AddressResponse;
            if ('status' in data && data.status === 'ok') {
                if (data.details) {
                    setAddressError(undefined);
                    const transformedAddresses = data.details.map(transformAddress);
                    setAddresses(transformedAddresses);
                }
            } else {
                // handle error
                setAddressError(data.errormessage);
            }
        } else {
            setAddressError('An error has occured, please try again');
        }

        setLoading(false);
    };

    /** TODO: Add basic validation to ensure first name and last name fields aren't empty
     * Use the following error message setError("First name and last name fields mandatory!")
     */
    const handlePersonSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!selectedAddress || !addresses.length) {
            setError("No address selected, try to select an address or find one if you haven't");
            return;
        }

        const foundAddress = addresses.find((address) => address.id === selectedAddress);

        if (!foundAddress) {
            setError('Selected address not found');
            return;
        }

        if (!firstName || !lastName) {
            setError('First name and last name fields mandatory!');
            return;
        }

        // Generate a random unique entry id for use case where the user adds the same address twice with different name
        const entryId = crypto?.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;

        addAddress({ ...foundAddress, firstName, lastName, entryId });
    };

    const handleClearForm = () => {
        setAddressError(undefined);
        setError(undefined);
        clearForm();
        setAddresses([]);
    };

    return (
        <main>
            <Section>
                <h1>
                    Create your own address book!
                    <br />
                    <small>Enter an address by postcode add personal info and done! 👏</small>
                </h1>
                {/* TODO: Create generic <Form /> component to display form rows, legend and a submit button  */}
                <Form
                    label="🏠 Find an address"
                    loading={loading}
                    formEntries={[
                        { name: 'postCode', placeholder: 'Post Code', extraProps: { onChange: handleFieldChange, value: postCode } },
                        { name: 'houseNumber', placeholder: 'House number', extraProps: { onChange: handleFieldChange, value: houseNumber } },
                    ]}
                    onFormSubmit={handleAddressSubmit}
                    submitText="Find"
                    error={addressError}
                    testId="address-form"
                />
                {addresses.length > 0
                    ? addresses.map((address) => {
                          return (
                              <Radio name="selectedAddress" id={address.id} key={address.id} onChange={handleFieldChange}>
                                  <Address {...address} />
                              </Radio>
                          );
                      })
                    : null}
                {/* TODO: Create generic <Form /> component to display form rows, legend and a submit button  */}
                {selectedAddress ? (
                    <>
                        <Form
                            label="✏️ Add personal info to address"
                            loading={loading}
                            formEntries={[
                                { name: 'firstName', placeholder: 'First name', extraProps: { onChange: handleFieldChange, value: firstName } },
                                {
                                    name: 'lastName',
                                    placeholder: 'Last name',
                                    extraProps: { onChange: handleFieldChange, value: lastName },
                                },
                            ]}
                            onFormSubmit={handlePersonSubmit}
                            submitText="Add to addressbook"
                            error={error}
                            testId="personal-info-form"
                        />
                    </>
                ) : null}

                {/* TODO: Add a button to clear all form fields. 
        Button must look different from the default primary button, see design. 
        Button text name must be "Clear all fields"
        On Click, it must clear all form fields, remove all search results and clear all prior
        error messages
        */}
                <Button type="button" variant="secondary" onClick={handleClearForm}>
                    Clear all fields
                </Button>
            </Section>

            <Section variant="dark">
                <AddressBook />
            </Section>
        </main>
    );
}

export default App;
