import React from 'react';

export function useFormField<T>(initialValues: T) {
    const [fieldValues, setFieldValues] = React.useState<T>(initialValues);

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setFieldValues({
            ...fieldValues,
            [e.target.name]: e.target.value,
        });

    return {
        fieldValues,
        handleFieldChange,
    };
}
