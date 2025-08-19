import { ButtonTheme, ButtonType, ButtonVariant } from '@/types';
import React, { FunctionComponent } from 'react';
import cx from 'classnames';

import $ from './Button.module.css';
import LoadingSpinner from '../Spinner/Spinner';

interface ButtonProps {
    onClick?: () => void;
    type?: ButtonType;
    variant?: ButtonVariant;
    theme?: ButtonTheme;
    loading?: boolean;
    children: React.ReactNode;
}

const Button: FunctionComponent<ButtonProps> = ({ children, onClick, type = 'button', variant = 'primary', theme = 'light', loading = false }) => {
    return (
        <button
            // TODO: Add conditional classNames
            // - Must have a condition to set the '.primary' className
            // - Must have a condition to set the '.secondary' className
            // - Display loading spinner per demo video. NOTE: add data-testid="loading-spinner" for spinner element (used for grading)
            className={cx($.button, $[variant], $[theme])}
            type={type}
            onClick={onClick}>
            {loading ? <LoadingSpinner /> : null}
            {children}
        </button>
    );
};

export default Button;
