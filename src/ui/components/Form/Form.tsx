import React, { FunctionComponent } from 'react';

import Button from '../Button/Button';
import InputText from '../InputText/InputText';
import $ from './Form.module.css';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

interface FormEntry {
    name: string;
    placeholder: string;
    // TODO: Defined a suitable type for extra props
    // This type should cover all different of attribute types
    extraProps: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'> & {
        value: string;
    };
}

interface FormProps {
    label: string;
    loading: boolean;
    formEntries: FormEntry[];
    onFormSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
    submitText: string;
    error?: string;
    testId?: string;
}

const Form: FunctionComponent<FormProps> = ({ label, loading, formEntries, onFormSubmit, submitText, error, testId }) => {
    return (
        <form onSubmit={onFormSubmit} data-testid={testId}>
            <fieldset>
                <legend>{label}</legend>
                {formEntries.map(({ name, placeholder, extraProps }, index) => (
                    <div key={`${name}-${index}`} className={$.formRow}>
                        <InputText key={`${name}-${index}`} name={name} placeholder={placeholder} {...extraProps} />
                    </div>
                ))}

                <Button loading={loading} type="submit">
                    {submitText}
                </Button>
                {/* TODO: Create an <ErrorMessage /> component for displaying an error message */}
                <ErrorMessage error={error || ''} />
            </fieldset>
        </form>
    );
};

export default Form;
