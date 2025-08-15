import React, { FunctionComponent } from 'react';
import cx from 'classnames';

import $ from './InputText.module.css';

interface InputTextProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name' | 'placeholder' | 'value' | 'onChange'> {
    name: string;
    placeholder: string;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputText: FunctionComponent<InputTextProps> = (props) => {
    const mergedClasses = cx(props.className, $.inputText);
    return <input {...props} aria-label={props.name} className={mergedClasses} type="text" />;
};

export default InputText;
