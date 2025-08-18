import React from 'react';

export function useFormField<T extends object>(initialValues: T) {
    const [fieldValues, setFieldValues] = React.useState<T>(initialValues);

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValues({
            ...fieldValues,
            [e.target.name]: e.target.value,
        });
    };

    const clearForm = () => {
        // setting all values to empty string based on shape of initialValues
        const clearedState = Object.keys(initialValues).reduce((prev, curr) => {
            prev[curr as keyof T] = '' as T[keyof T];
            return prev;
        }, {} as T);
        setFieldValues(clearedState);
    };

    return {
        fieldValues,
        handleFieldChange,
        clearForm,
    };
}
